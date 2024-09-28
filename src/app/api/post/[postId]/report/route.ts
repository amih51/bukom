import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ReportInfo } from "@/lib/types";

export async function GET(
  req: Request,
  { params: { postId } }: { params: { postId: string } },
) {
  try {
    const user = await currentUser();
    if (!user?.id) throw Error("Unauthorized");

    const report = await prisma.report.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId,
        },
      },
    });

    const data: ReportInfo = {
      isReportedByUser: !!report,
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

    await prisma.report.upsert({
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

    await prisma.report.deleteMany({
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
