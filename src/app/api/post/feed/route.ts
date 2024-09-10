import getSession from "@/lib/get-session";
import { prisma } from "@/lib/prisma";
import { PostDataInclude } from "@/lib/types";

export async function GET() {
  try {
    const session = await getSession();
    if (!session)
      return Response.json({ error: "Unauthorized" }, { status: 401 });

    const posts = await prisma.post.findMany({
      include: PostDataInclude,
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(posts);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
