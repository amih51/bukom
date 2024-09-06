import DisplayPost from "@/components/post/display-post";
import { prisma } from "@/lib/prisma";
import { PostDataInclude } from "@/lib/types";
import { Metadata } from "next";

export async function generateMetadata({
  params: { profile },
}: {
  params: { profile: string };
}): Promise<Metadata> {
  return {
    title: `${profile}`,
  };
}

export default async function Page({
  params: { profile },
}: {
  params: { profile: string };
}) {
  const user = await prisma.user.findUnique({
    where: {
      username: profile,
    },
  });
  const posts = await prisma.post.findMany({
    where: {
      userId: user?.id,
    },
    include: PostDataInclude,
  });

  return (
    <main className="flex w-full flex-col">
      {posts.map((post) => (
        <DisplayPost key={post.id} post={post} />
      ))}
    </main>
  );
}
