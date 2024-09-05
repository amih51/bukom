import { Metadata } from "next";
import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const PostEditor = dynamic(
  () => import("@/components/post/editor/post-editor"),
  { ssr: false },
);

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const session = await getSession();

  if (!session?.user) redirect("/");

  return (
    <main className="flex w-full flex-col">
      <PostEditor />
      <div>
        <div className="flex h-32 flex-auto items-center border">post</div>
        <div className="flex h-32 flex-auto items-center border">post</div>
        <div className="flex h-32 flex-auto items-center border">post</div>
        <div className="flex h-32 flex-auto items-center border">post</div>
        <div className="flex h-32 flex-auto items-center border">post</div>
        <div className="flex h-32 flex-auto items-center border">post</div>
        <div className="flex h-32 flex-auto items-center border">post</div>
        <div className="flex h-32 flex-auto items-center border">post</div>
        <div className="flex h-32 flex-auto items-center border">post</div>
        <div className="flex h-32 flex-auto items-center border">post</div>
        <div className="flex h-32 flex-auto items-center border">post</div>
        <div className="flex h-32 flex-auto items-center border">post</div>
      </div>
    </main>
  );
}
