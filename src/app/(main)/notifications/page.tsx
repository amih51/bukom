import { Metadata } from "next";
import { Suspense } from "react";
import { LuLoader } from "react-icons/lu";

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Notifications",
  },
};

export default function Page() {
  return (
    <main className="flex w-full flex-col">
      <Suspense fallback={<LuLoader className="mx-auto my-3 animate-spin" />}>
        Notif
      </Suspense>
    </main>
  );
}
