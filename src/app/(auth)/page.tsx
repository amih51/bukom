"use client";

import Footer from "./footer";
import SignIn from "./signin";

export default function Page() {
  return (
    <div className="h-screen">
      <main className="flex flex-col  md:flex-row h-full">
        <div className="flex flex-auto justify-center items-center border-2 h-full">
          logo
        </div>
        <SignIn />
      </main>
      <Footer />
    </div>
  );
}
