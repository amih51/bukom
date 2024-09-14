import DisplayPost from "@/components/post/display-post";
import SearchField from "@/components/search-field";
import { prisma } from "@/lib/prisma";
import { PostDataInclude } from "@/lib/types";
import { Metadata } from "next";

export function generateMetadata({
  searchParams: { q },
}: {
  searchParams: { q: string };
}): Metadata {
  return {
    title: `Search results for "${q}"`,
  };
}

export default async function Page({
  searchParams: { q },
}: {
  searchParams: { q: string };
}) {
  const posts = await prisma.post.findMany({
    include: PostDataInclude,
    orderBy: { createdAt: "desc" },
  });

  const filteredPosts = q
    ? posts.filter((post) =>
        post.content?.toLowerCase().includes(q.toLowerCase()),
      )
    : posts;

  return (
    <main className="flex w-full flex-col">
      <div className="my-2 rounded-xl bg-secondary">
        <SearchField />
      </div>
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <div key={post.id} className="mb-4 last:mb-0">
            <DisplayPost post={post} />
          </div>
        ))
      ) : (
        <div className="font-bold">No results for &quot;{q}&quot;</div>
      )}
    </main>
  );
}
