"use server";

import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PostDataInclude } from "@/lib/types";

export async function submitReply(
  input: string,
  parentId: string,
  categoryId: string,
  isAnon: boolean,
) {
  const user = await currentUser();

  if (!input.trim()) throw Error("Empty input");

  if (!user?.id) throw Error("Unauthorized");

  const newPost = await prisma.post.create({
    data: {
      content: input,
      userId: user.id,
      parentId,
      categoryId,
      isAnon,
    },
    include: PostDataInclude,
  });
  return newPost;
}
