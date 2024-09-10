"use client";

import DisplayPost from "@/components/post/display-post";
import kyInstance from "@/lib/ky";
import { PostData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { LuLoader } from "react-icons/lu";

export default function Feed() {
  const query = useQuery<PostData[]>({
    queryKey: ["feed"],
    queryFn: kyInstance.get("api/post/feed").json<PostData[]>,
  });

  if (query.status === "pending") {
    return <LuLoader className="mx-auto animate-spin" />;
  }

  if (query.status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occured while loading page
      </p>
    );
  }

  return (
    <>
      {query.data.map((post) => (
        <DisplayPost key={post.id} post={post} />
      ))}
    </>
  );
}