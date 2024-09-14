import DisplayPost from "@/components/post/display-post";
import ReplyEditor from "@/components/post/editor/reply-editor";
import { prisma } from "@/lib/prisma";
import { PostData, PostDataInclude } from "@/lib/types";
import { Metadata } from "next";
import Replies from "./replies";

const getPost = async (postId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: PostDataInclude,
  });

  return post;
};

export async function generateMetadata({
  params: { postId },
}: {
  params: { postId: string };
}): Promise<Metadata> {
  const post = await getPost(postId);
  return {
    title: `${post?.user.username}: ${post?.content ?? "No content"}`,
  };
}

export default async function Page({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const post = await getPost(postId);

  if (!post) return <div>post not found</div>;

  let parent: PostData[] = [];

  if (post.parentId) {
    const firstParent = await prisma.post.findUnique({
      include: PostDataInclude,
      where: {
        id: post.parentId,
      },
    });

    if (firstParent) {
      parent.push(firstParent);
    }

    while (parent[0]?.parentId) {
      const parentPost = await prisma.post.findUnique({
        include: PostDataInclude,
        where: {
          id: parent[parent.length - 1].parentId ?? undefined,
        },
      });

      if (parentPost) {
        parent.unshift(parentPost);
      } else {
        break;
      }
    }
  }

  return (
    <main className="w-full">
      <div className="mx-6 mt-2 border-x">
        {parent.map((post) => (
          <div key={post.id} className="mb-4 last:mb-0 last:pb-1">
            <DisplayPost post={post} />
          </div>
        ))}
      </div>
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
