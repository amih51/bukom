import getSession from "@/lib/get-session";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return new Response(JSON.stringify({ error: "Username is required" }), {
        status: 400,
      });
    }

    const reservedUsernames = ["anon", "bookmarks", "home", "search"];
    if (reservedUsernames.includes(username)) {
      return new Response(JSON.stringify({ isUnique: false }));
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return new Response(JSON.stringify({ isUnique: true }));
    }

    return new Response(JSON.stringify({ isUnique: false }));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
