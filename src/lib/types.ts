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
  votes: {
    select: {
      voteType: true,
      userId: true,
    },
  },
  _count: {
    select: {
      replies: true,
      votes: true,
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
  _count: {
    select: {
      replies: true,
    },
  },
} satisfies Prisma.PostInclude;

export type PostDataWithReply = Prisma.PostGetPayload<{
  include: typeof PostDataInclude;
}>;

export interface PostsPage {
  posts: PostData[];
  nextCursor: string | null;
}

export const UserInclude = {
  posts: {
    include: PostDataInclude,
  },
  _count: {
    select: {
      posts: true,
    },
  },
} satisfies Prisma.UserInclude;

export type UserData = Prisma.UserGetPayload<{
  include: typeof UserInclude;
}>;

export interface VoteInfo {
  votes: number;
  voteType: boolean | null;
}
