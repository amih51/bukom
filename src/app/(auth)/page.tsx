import getSession from "@/lib/get-session";
import Footer from "./footer";
import SignIn from "./signin";
import { redirect } from "next/navigation";
import Logo from "./logo";

export default async function Page() {
  const session = await getSession();
  if (session?.user) redirect("/home");
  return (
    <div className="h-screen bg-background">
      <div className="h-5/6 px-6 md:h-full">
        <main className="flex h-full flex-col md:flex-row">
          <div className="flex h-1/6 flex-auto items-center justify-center md:h-full md:w-1/2">
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
