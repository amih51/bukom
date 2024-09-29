import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PostDataInclude, PostsPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const q = req.nextUrl.searchParams.get("q") || "";
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const searchQuery = q.split(" ").join(" & ");

    const pageSize = 10;

    const user = await currentUser();
    if (!user?.id) throw Error("Unauthorized");

    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            content: {
              search: searchQuery,
            },
          },
          {
            isAnon: false,
            user: {
              name: {
                search: searchQuery,
              },
            },
          },
          {
            isAnon: false,
            user: {
              username: {
                search: searchQuery,
              },
            },
          },
        ],
      },
      include: PostDataInclude,
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

    const sanitizedPosts = posts.slice(0, pageSize).map((post) => ({
      ...post,
      userId: post.isAnon && post.userId !== user.id ? "anon" : post.userId,
      user:
        post.isAnon && post.userId !== user.id
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

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
