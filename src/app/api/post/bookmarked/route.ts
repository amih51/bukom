import getSession from "@/lib/get-session";
import { prisma } from "@/lib/prisma";
import { PostDataInclude, PostsPage } from "@/lib/types";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const pageSize = 10;

    const session = await getSession();
    if (!session)
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    const user = session.user;

    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: user.id,
      },
      include: {
        post: {
          include: PostDataInclude,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor =
      bookmarks.length > pageSize ? bookmarks[pageSize].id : null;

    const posts = bookmarks.map((bookmark) => bookmark.post).slice(0, pageSize);

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

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
