import getSession from "@/lib/get-session";
import Footer from "./footer";
import SignIn from "./signin";
import { redirect } from "next/navigation";
import Logo from "./logo";

export default async function Page() {
  const session = await getSession();
  if (session?.user) redirect("/home");
  return (
    <div className="h-screen bg-background sm:px-32">
      <div className="px-6 md:h-full">
        <main className="flex h-full flex-col md:flex-row">
          <div className="m-6 flex h-1/6 flex-auto items-center justify-center sm:m-0 md:h-full md:w-1/2">
            <Logo />
          </div>
          <div className="md:w-1/2">
            <SignIn />
          </div>
        </main>
      </div>
    </div>
  );
}
