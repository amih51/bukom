"use server";

import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserInclude } from "@/lib/types";
import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "@/lib/validation";

export async function updateUserProfile(values: UpdateUserProfileValues) {
  const validatedValues = updateUserProfileSchema.parse(values);

  const user = await currentUser();
  if (!user?.id) throw Error("Unauthorized");

  const updatedUser = await prisma.$transaction(async (tx) => {
    const updatedUser = await tx.user.update({
      where: { id: user.id },
      data: validatedValues,
      include: UserInclude,
    });
    return updatedUser;
  });

  return updatedUser;
}
