import getSession from "@/lib/get-session";
import { prisma } from "@/lib/prisma";
import { PostData, PostDataInclude } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const session = await getSession();

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const childId = url.searchParams.get("childId");

    if (!childId) {
      return new Response(JSON.stringify({ error: "childId is required" }), {
        status: 400,
      });
    }

    const post = await prisma.post.findUnique({
      include: PostDataInclude,
      where: { id: childId },
    });

    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }

    let parents: PostData[] = [];
    let currentParentId = post.parentId;

    while (currentParentId) {
      const parentPost = await prisma.post.findUnique({
        where: { id: currentParentId },
        include: PostDataInclude,
      });

      if (!parentPost) break;
      parents.unshift(parentPost);
      currentParentId = parentPost.parentId;
    }

    const sanitizedPosts = parents.map((parentPost) => ({
      ...parentPost,
      userId:
        parentPost.isAnon && parentPost.userId !== session.user.id
          ? "anon"
          : parentPost.userId,
      user:
        parentPost.isAnon && parentPost.userId !== session.user.id
          ? {
              id: "anon",
              username: "anon",
              name: "anon",
              image: null,
            }
          : parentPost.user,
    }));

    return new Response(
      JSON.stringify({
        posts: sanitizedPosts,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
