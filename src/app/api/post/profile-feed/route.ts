import getSession from "@/lib/get-session";
import { prisma } from "@/lib/prisma";
import { PostDataInclude, PostsPage } from "@/lib/types";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  try {
    const url = new URL(req.url);
    const cursor = url.searchParams.get("cursor") || undefined;
    const pageSize = 10;
    const session = await getSession();

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const userId = url.searchParams.get("userId");
    if (!userId) {
      return new Response(JSON.stringify({ error: "userId is required" }), {
        status: 400,
      });
    }

    const whereCondition =
      session.user.id === userId ? { userId } : { userId, isAnon: false };

    const posts = await prisma.post.findMany({
      cacheStrategy: {
        ttl: 60,
        swr: 10,
      },
      where: whereCondition,
      include: PostDataInclude,
      orderBy: {
        createdAt: "desc",
      },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

    const sanitizedPosts = posts.slice(0, pageSize).map((post) => ({
      ...post,
      userId:
        post.isAnon && post.userId !== session.user.id ? "anon" : post.userId,
      user:
        post.isAnon && post.userId !== session.user.id
          ? {
              id: "anon",
              username: "anon",
              name: "anon",
              image: null,
            }
          : post.user,
    }));

    const data: PostsPage = {
      posts: sanitizedPosts,
      nextCursor,
    };

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
