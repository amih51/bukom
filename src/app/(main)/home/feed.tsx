"use client";

import InfiniteScrollContainer from "@/components/infinite-scroll-container";
import DisplayPost from "@/components/post/display-post";
import kyInstance from "@/lib/ky";
import { PostsPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LuLoader } from "react-icons/lu";

export default function Feed() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/post/feed",
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
  const posts = data?.pages.flatMap((page) => page.posts) || [];

  return status === "pending" ? (
    <LuLoader className="mx-auto my-3 animate-spin" />
  ) : status === "error" ? (
    <p className="text-center text-destructive">
      An error occured while loading page
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
