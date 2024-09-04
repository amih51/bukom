import { Metadata } from "next";
import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";
import SearchField from "@/components/nav/search-field";

export const metadata: Metadata = {
  title: "Search",
};

export default async function Home() {
  const session = await getSession();

  if (!session?.user) redirect("/");

  return (
    <main className="flex items-center justify-center">
      <div className="flex sm:hidden">
        <SearchField />
      </div>
    </main>
  );
}
