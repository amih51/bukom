import { Prisma } from "@prisma/client";

export const PostDataInclude = {
  user: {
    select: {
      id: true,
      username: true,
      name: true,
      image: true,
    },
  },
  parent: {
    select: {
      id: true,
      user: {
        select: {
          username: true,
        },
      },
    },
  },
} satisfies Prisma.PostInclude;

export type PostData = Prisma.PostGetPayload<{
  include: typeof PostDataInclude;
}>;

export const PostWithReplyDataInclude = {
  user: {
    select: {
      id: true,
      username: true,
      name: true,
      image: true,
    },
  },
  parent: {
    select: {
      id: true,
      user: {
        select: {
          username: true,
        },
      },
    },
  },
  replies: {
    include: PostDataInclude,
  },
} satisfies Prisma.PostInclude;

export type PostDataWithReply = Prisma.PostGetPayload<{
  include: typeof PostDataInclude;
}>;
