import { Metadata } from "next";
import dynamic from "next/dynamic";
import Feed from "./feed";
import SearchField from "@/components/search-field";

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
      <div className="mt-6 w-full">
        <div className="mb-3 text-3xl">Beranda</div>
        <div className="rounded-xl bg-secondary">
          <SearchField />
        </div>
        <div></div>
      </div>

      <Feed />
    </main>
  );
}
