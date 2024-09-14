"use server";

import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PostDataInclude } from "@/lib/types";

export async function deletePost(id: string) {
  const user = await currentUser();

  if (!user?.id) throw Error("Unauthorized");

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) throw new Error("Post not found");

  if (post.userId !== user.id) throw new Error("Unauthorized");

  const deletedPost = await prisma.post.delete({
    where: { id },
    include: PostDataInclude,
  });

  return deletedPost;
}
