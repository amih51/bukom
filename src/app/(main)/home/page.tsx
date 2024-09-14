import { Metadata } from "next";
import Feed from "./feed";
import { Suspense } from "react";
import { LuLoader } from "react-icons/lu";

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
