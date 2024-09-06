import DisplayPost from "@/components/post/display-post";
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

  const filteredPosts = posts.filter((post) =>
    post.content.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <main className="flex w-full flex-col">
      {filteredPosts.map((post) => (
        <DisplayPost key={post.id} post={post} />
      ))}
    </main>
  );
}
