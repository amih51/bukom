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
        votes: {
          _count: "desc",
        },
      },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const processedPosts = posts.map((post) => {
      const trueVotes = post.votes.filter(
        (vote) => vote.voteType === true,
      ).length;
      const falseVotes = post.votes.filter(
        (vote) => vote.voteType === false,
      ).length;
      const voteDifference = trueVotes - falseVotes;

      return {
        ...post,
        voteDifference,
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
      };
    });

    processedPosts.sort((a, b) => b.voteDifference - a.voteDifference);

    const nextCursor =
      processedPosts.length > pageSize ? processedPosts[pageSize].id : null;
    const sanitizedPosts = processedPosts.slice(0, pageSize);

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
