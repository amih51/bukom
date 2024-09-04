import getSession from "@/lib/get-session";
import Footer from "./footer";
import SignIn from "./signin";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  if (session?.user) redirect("/home");
  return (
    <div className="h-screen">
      <div className="h-5/6 md:h-full">
        <main className="flex flex-col md:flex-row h-full">
          <div className="flex flex-auto justify-center items-center border-2 h-1/6 md:h-full">
            logo
          </div>
          <SignIn />
        </main>
      </div>
      <Footer />
    </div>
  );
}
