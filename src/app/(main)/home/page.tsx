import { Metadata } from "next";
import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { prisma } from "@/lib/prisma";
import DisplayPost from "@/components/post/display-post";
import { PostDataInclude } from "@/lib/types";

const PostEditor = dynamic(
  () => import("@/components/post/editor/post-editor"),
  { ssr: false },
);

export const metadata: Metadata = {
  title: "Home",
};

export default async function Page() {
  const session = await getSession();
  const posts = await prisma.post.findMany({
    include: PostDataInclude,
    orderBy: { createdAt: "desc" },
  });

  if (!session?.user) redirect("/");

  return (
    <main className="flex w-full flex-col">
      <div className="my-2 w-full border-2 sm:border-l-0">
        <PostEditor />
      </div>

      {posts.map((post) => (
        <div key={post.id} className="mb-4 last:mb-0">
          <DisplayPost post={post} />
        </div>
      ))}
    </main>
  );
}
