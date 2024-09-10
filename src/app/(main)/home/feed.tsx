"use client";

import DisplayPost from "@/components/post/display-post";
import { PostData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { LuLoader } from "react-icons/lu";

export default function Feed() {
  const query = useQuery<PostData[]>({
    queryKey: ["feed"],
    queryFn: async () => {
      const res = await fetch("api/post/feed");
      if (!res.ok) {
        throw Error(`Request failed with status code ${res.status}`);
      }
      return res.json();
    },
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
