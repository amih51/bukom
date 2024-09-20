"use client";

import DisplayPost from "@/components/post/display-post";
import PostSkeleton from "@/components/post/post-skeleton";
import kyInstance from "@/lib/ky";
import { PostsPage } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function Parents({ postId }: { postId: string }) {
  const { data, status } = useQuery({
    queryKey: ["parentPosts", postId],
    queryFn: () =>
      kyInstance
        .get(`/api/post/${postId}/parent`, {
          searchParams: {
            childId: postId,
          },
        })
        .json<PostsPage>(),
  });

  const posts = data?.posts || [];

  return status === "pending" ? (
    <div className="mx-6 mt-2 border-x">
      <div className="mb-4 last:mb-0 last:pb-1">
        <PostSkeleton />
      </div>
    </div>
  ) : status === "error" ? (
    <p className="text-center text-destructive">
      An error occurred while loading page
    </p>
  ) : (
    <div className="mx-6 mt-2 border-x">
      {posts.map((post) => (
        <div key={post.id} className="mb-4 last:mb-0 last:pb-1">
          <DisplayPost post={post} />
        </div>
      ))}
    </div>
  );
}
