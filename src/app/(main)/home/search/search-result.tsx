"use client";

import InfiniteScrollContainer from "@/components/infinite-scroll-container";
import DisplayPost from "@/components/post/display-post";
import PostSkeleton from "@/components/post/post-skeleton";
import kyInstance from "@/lib/ky";
import { PostsPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LuLoader } from "react-icons/lu";

export default function SearchResults({ query }: { query: string }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "search", query],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get("/api/search", {
          searchParams: {
            q: query,
            ...(pageParam ? { cursor: pageParam } : {}),
          },
        })
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    gcTime: 0,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  return status === "pending" ? (
    <div className="mt-2">
      <PostSkeleton />
    </div>
  ) : status === "success" && !posts.length && !hasNextPage ? (
    <p className="text-center text-muted-foreground">
      No posts found for this query.
    </p>
  ) : status === "error" ? (
    <p className="text-center text-destructive">
      An error occured while loading page
    </p>
  ) : (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((post) => (
        <DisplayPost key={post.id} post={post} />
      ))}
      {isFetchingNextPage && <LuLoader className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
