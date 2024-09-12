import { Prisma } from "@prisma/client";

const userSelect = {
  id: true,
  username: true,
  name: true,
  image: true,
};

const parentSelect = {
  id: true,
  user: {
    select: {
      username: true,
    },
  },
};

const votesSelect = {
  voteType: true,
  userId: true,
};

const bookmarkSelect = {
  userId: true,
};

const countSelect = {
  replies: true,
  votes: true,
};

export const PostDataInclude = {
  user: { select: userSelect },
  parent: { select: parentSelect },
  votes: { select: votesSelect },
  bookmarks: { select: bookmarkSelect },
  _count: { select: countSelect },
} satisfies Prisma.PostInclude;

export type PostData = Prisma.PostGetPayload<{
  include: typeof PostDataInclude;
}>;

export const PostWithReplyDataInclude = {
  ...PostDataInclude,
  replies: { include: PostDataInclude },
} satisfies Prisma.PostInclude;

export type PostDataWithReply = Prisma.PostGetPayload<{
  include: typeof PostWithReplyDataInclude;
}>;

export interface PostsPage {
  posts: PostData[];
  nextCursor: string | null;
}

export const UserInclude = {
  posts: { include: PostDataInclude },
  _count: { select: { posts: true } },
} satisfies Prisma.UserInclude;

export type UserData = Prisma.UserGetPayload<{
  include: typeof UserInclude;
}>;

export interface VoteInfo {
  votes: number;
  voteType: boolean | null;
}

export interface BookmarkInfo {
  isBookmarkedByUser: boolean;
}
