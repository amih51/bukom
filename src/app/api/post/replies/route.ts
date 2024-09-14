import getSession from "@/lib/get-session";
import { prisma } from "@/lib/prisma";
import { PostDataInclude, PostsPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const cursor = url.searchParams.get("cursor") || undefined;
    const pageSize = 5;
    const session = await getSession();

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const parentId = url.searchParams.get("parentId");
    if (!parentId) {
      return new Response(JSON.stringify({ error: "parentId is required" }), {
        status: 400,
      });
    }

    const posts = await prisma.post.findMany({
      where: {
        parentId,
      },
      include: PostDataInclude,
      orderBy: {
        createdAt: "desc",
      },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

    const data: PostsPage = {
      posts: posts.slice(0, pageSize),
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
