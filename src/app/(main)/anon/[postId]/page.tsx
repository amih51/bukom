import DisplayPost from "@/components/post/display-post";
import ReplyEditor from "@/components/post/editor/reply-editor";
import { prisma } from "@/lib/prisma";
import { PostData, PostDataInclude } from "@/lib/types";
import { Metadata } from "next";
import Replies from "../../[username]/post/[postId]/replies";
import Parents from "../../[username]/post/[postId]/parents";
import { cache } from "react";
import { currentUser } from "@/lib/auth";

const getPost = cache(async (postId: string) => {
  const user = await currentUser();
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: PostDataInclude,
  });

  const sanitizedPost = post
    ? ((p: PostData) => ({
        ...p,
        userId: p.isAnon && p.userId !== user?.id ? "anon" : p.userId,
        user:
          p.isAnon && p.userId !== user?.id
            ? {
                id: "anon",
                username: "anon",
                name: "anon",
                image: null,
              }
            : p.user,
      }))(post)
    : null;

  return sanitizedPost;
});

export async function generateMetadata({
  params: { postId },
}: {
  params: { postId: string };
}): Promise<Metadata> {
  const post = await getPost(postId);
  return {
    title: `Warga: ${post?.content ?? "No content"}`,
  };
}

export default async function Page({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const post = await getPost(postId);

  if (!post) return <div>post not found</div>;

  return (
    <main className="w-full">
      <Parents postId={postId} />
      <div className="mb-1 w-full">
        <DisplayPost post={post} />
        <div className="flex w-full flex-col gap-6 border-t py-6">
          <p className="text-xl">Comments</p>
          <ReplyEditor parentId={postId} categoryId={post.categoryId} />
        </div>
      </div>
      <div className="border-b">
        <Replies postId={postId} />
      </div>
    </main>
  );
}
