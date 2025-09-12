import { Metadata } from "next";
import { Suspense } from "react";
import { LuLoader } from "react-icons/lu";
import Feed from "./feed";

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Home",
  },
};

export default function Page() {
  return (
    <main className="flex w-full flex-col">
      <Suspense fallback={<LuLoader className="mx-auto my-3 animate-spin" />}>
        <Feed />
      </Suspense>
    </main>
  );
}
