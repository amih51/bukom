import getSession from "@/lib/get-session";
import Footer from "./footer";
import SignIn from "./signin";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Page() {
  const session = await getSession();

  if (session?.user) redirect("/home");
  return (
    <div className="h-screen bg-background">
      <div className="h-5/6 md:h-full">
        <main className="flex h-full flex-col md:flex-row">
          <div className="flex h-1/6 flex-auto items-center justify-center border-2 md:h-full">
            <Image
              src={"/icons/android-chrome-512x512.png"}
              alt="BUKOM Icon"
              height={512}
              width={512}
            />
          </div>
          <SignIn />
        </main>
      </div>
      <Footer />
    </div>
  );
}
