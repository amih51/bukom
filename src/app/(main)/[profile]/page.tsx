import { Metadata } from "next";
import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function Home() {
  const session = await getSession();

  if (!session?.user) redirect("/");

  return <main className="flex justify-center items-center">Profile</main>;
}
