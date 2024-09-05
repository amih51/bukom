"use server";

import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function SubmitPost(input: string) {
  const user = await currentUser();

  if (!user?.id) throw Error("Unauthorized");

  await prisma.post.create({
    data: {
      content: input,
      userId: user.id,
    },
  });
}
