import getSession from "@/lib/get-session";
import SignIn from "./signin";
import { redirect } from "next/navigation";
import Logo from "../../components/logo";

export default async function Page() {
  const session = await getSession();
  if (session?.user) redirect("/home");
  return (
    <div className="h-screen bg-background sm:px-32">
      <div className="h-full px-6">
        <main className="flex h-full flex-col items-center justify-center gap-12 sm:mt-0 md:flex-row">
          <div className="m-6 mt-12 flex h-1/6 items-center justify-center sm:m-0 md:h-full md:w-1/2">
            <Logo className="size-56 sm:size-full" />
          </div>
          <div className="h-full sm:h-fit md:w-1/2">
            <SignIn />
          </div>
        </main>
      </div>
    </div>
  );
}
