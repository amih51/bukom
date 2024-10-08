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

const categorySelect = {
  name: true,
  id: true,
};

const votesSelect = {
  voteType: true,
  userId: true,
};

const bookmarkSelect = {
  userId: true,
};

const ReportSelect = {
  userId: true,
};

const countPostSelect = {
  replies: true,
  votes: true,
  reports: true,
};

const countUserSelect = {
  posts: true,
  follower: true,
  following: true,
};

export const PostDataInclude = {
  user: { select: userSelect },
  parent: { select: parentSelect },
  category: { select: categorySelect },
  votes: { select: votesSelect },
  bookmarks: { select: bookmarkSelect },
  reports: { select: ReportSelect },
  _count: { select: countPostSelect },
} satisfies Prisma.PostInclude;

export type PostData = Prisma.PostGetPayload<{
  include: typeof PostDataInclude;
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

export interface ReportInfo {
  isReportedByUser: boolean;
}

export interface FollowerInfo {
  followers: number;
  isFollowedByUser: boolean;
}
