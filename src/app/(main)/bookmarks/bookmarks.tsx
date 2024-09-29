"use client";

import InfiniteScrollContainer from "@/components/infinite-scroll-container";
import DisplayPost from "@/components/post/display-post";
import PostSkeleton from "@/components/post/post-skeleton";
import kyInstance from "@/lib/ky";
import { PostsPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LuLoader } from "react-icons/lu";

export default function Bookmarks() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["feed", "bookmarks"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/post/bookmarked",
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  return status === "pending" ? (
    <div className="mt-2">
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </div>
  ) : status === "error" ? (
    <p className="text-center text-destructive">
      An error occured while loading page
    </p>
  ) : posts.length === 0 ? (
    <p className="text-center font-semibold">
      Bookmark posts to easily find them again in the future.
    </p>
  ) : (
    <InfiniteScrollContainer
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((post) => (
        <div key={post.id} className="mt-2">
          <DisplayPost post={post} />
        </div>
      ))}
      {isFetchingNextPage && <LuLoader className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
