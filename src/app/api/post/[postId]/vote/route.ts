import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { VoteInfo } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  req: NextRequest,
  { params: { postId } }: { params: { postId: string } },
) {
  try {
    const user = await currentUser();
    if (!user?.id) throw Error("Unauthorized");

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        votes: {
          select: {
            voteType: true,
          },
        },
      },
    });

    if (!post) {
      return new NextResponse(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }

    const trueVotes = post.votes.filter(
      (vote) => vote.voteType === true,
    ).length;
    const falseVotes = post.votes.filter(
      (vote) => vote.voteType === false,
    ).length;
    const voteDifference = trueVotes - falseVotes;

    const data: VoteInfo = {
      votes: voteDifference,
      voteType: post.votes.length > 0 ? post.votes[0].voteType : null,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params: { postId } }: { params: { postId: string } },
) {
  try {
    const user = await currentUser();
    if (!user?.id) throw Error("Unauthorized");
    const body = await req.json();
    const { voteType } = body as { voteType: boolean };

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        userId: true,
      },
    });

    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    const vote = await prisma.vote.upsert({
      where: {
        userId_postId: {
          userId: user.id,
          postId,
        },
      },
      update: {
        voteType,
      },
      create: {
        userId: user.id,
        postId,
        voteType,
      },
    });

    return Response.json(vote);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params: { postId } }: { params: { postId: string } },
) {
  try {
    const user = await currentUser();
    if (!user?.id) throw Error("Unauthorized");

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        userId: true,
      },
    });

    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    await prisma.$transaction([
      prisma.vote.deleteMany({
        where: {
          userId: user.id,
          postId,
        },
      }),
    ]);

    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
