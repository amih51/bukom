import { Metadata } from "next";
import { Suspense } from "react";
import { LuLoader } from "react-icons/lu";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Home",
  },
};

const Feed = dynamic(() => import("./feed"), {
  ssr: false,
});

export default function Page() {
  return (
    <main className="flex w-full flex-col">
      <Suspense fallback={<LuLoader className="mx-auto my-3 animate-spin" />}>
        <Feed />
      </Suspense>
    </main>
  );
}
