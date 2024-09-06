import DisplayPost from "@/components/post/display-post";
import { prisma } from "@/lib/prisma";
import { PostDataInclude } from "@/lib/types";
import { Metadata } from "next";

export async function generateMetadata({
  params: { postId },
}: {
  params: { postId: string };
}): Promise<Metadata> {
  return {
    title: `${postId}`,
  };
}

export default async function Page({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: PostDataInclude,
  });

  if (!post) return <div>post not found</div>;

  return (
    <main className="w-full">
      <div className="w-full">
        <DisplayPost post={post} />
      </div>
    </main>
  );
}
