import { Prisma } from "@prisma/client";

export const PostDataInclude = {
  user: {
    select: {
      username: true,
      name: true,
      image: true,
    },
  },
} satisfies Prisma.PostInclude;

export type PostData = Prisma.PostGetPayload<{
  include: typeof PostDataInclude;
}>;
