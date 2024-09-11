import { Metadata } from "next";
import dynamic from "next/dynamic";
import Feed from "./feed";

const PostEditor = dynamic(
  () => import("@/components/post/editor/post-editor"),
  { ssr: false },
);

export const metadata: Metadata = {
  title: "Home",
};

export default function Page() {
  return (
    <main className="flex w-full flex-col">
      <div className="mt-2 w-full border-2 sm:border-l-0">
        <PostEditor />
      </div>

      <Feed />
    </main>
  );
}
