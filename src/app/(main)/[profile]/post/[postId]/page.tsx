import DisplayPost from "@/components/post/display-post";
import { prisma } from "@/lib/prisma";
import {
  PostData,
  PostDataInclude,
  PostWithReplyDataInclude,
} from "@/lib/types";
import { Post } from "@prisma/client";
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
    include: PostWithReplyDataInclude,
    where: {
      id: postId,
    },
  });

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
      <div className="mx-6 size-full border-x-2">
        {parent.map((post) => (
          <DisplayPost key={post.id} post={post} />
        ))}
      </div>
      <div className="w-full">
        <DisplayPost post={post} />
      </div>
      <div className="mx-6 w-full border-x-2">
        {post.replies.map((post) => (
          <DisplayPost key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
