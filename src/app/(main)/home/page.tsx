import { Metadata } from "next";
import dynamic from "next/dynamic";
import Feed from "./feed";
import SearchField from "@/components/search-field";

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Home",
  },
};

export default async function Page() {
  return (
    <main className="flex w-full flex-col">
      <Feed />
    </main>
  );
}
