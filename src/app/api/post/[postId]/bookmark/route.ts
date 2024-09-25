import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BookmarkInfo } from "@/lib/types";

export const runtime = "edge";

export async function GET(
  req: Request,
  { params: { postId } }: { params: { postId: string } },
) {
  try {
    const user = await currentUser();
    if (!user?.id) throw Error("Unauthorized");

    const bookmark = await prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId,
        },
      },
    });

    const data: BookmarkInfo = {
      isBookmarkedByUser: !!bookmark,
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

    await prisma.bookmark.upsert({
      where: {
        userId_postId: {
          userId: user.id,
          postId,
        },
      },
      create: {
        userId: user.id,
        postId,
      },
      update: {},
    });

    return new Response();
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

    await prisma.bookmark.deleteMany({
      where: {
        userId: user.id,
        postId,
      },
    });

    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
