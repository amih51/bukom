import { Prisma } from "@prisma/client";

const userSelect = {
  id: true,
  username: true,
  name: true,
  image: true,
};

const parentSelect = {
  id: true,
  isAnon: true,
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

const countPostSelect = {
  replies: true,
  votes: true,
};

const countUserSelect = {
  posts: true,
  follower: true,
  following: true,
};

export const PostDataInclude = {
  user: { select: userSelect },
  parent: { select: parentSelect },
  votes: { select: votesSelect },
  bookmarks: { select: bookmarkSelect },
  _count: { select: countPostSelect },
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
  follower: true,
  following: true,
  _count: { select: countUserSelect },
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

export interface FollowerInfo {
  followers: number;
  isFollowedByUser: boolean;
}
