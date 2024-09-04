import { Metadata } from "next";
import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const session = await getSession();

  if (!session?.user) redirect("/");

  return (
    <main className="flex w-full flex-col">
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
      <div className="flex h-full flex-auto items-center border">post</div>
    </main>
  );
}
