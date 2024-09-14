import { Metadata } from "next";
import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";
import Bookmarks from "./bookmarks";

export const metadata: Metadata = {
  title: "Bookmarks",
};

export default async function Page() {
  const session = await getSession();

  if (!session?.user) redirect("/");

  return (
    <main className="flex w-full flex-col">
      <div className="mb-2">
        <h1 className="mt-6 text-xl font-bold">Bookmarks</h1>
      </div>
      <Bookmarks />
    </main>
  );
}
