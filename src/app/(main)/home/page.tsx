import { Metadata } from "next";
import Feed from "./feed";

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Home",
  },
};

export default async function Page() {
  return (
    <main className="flex w-full flex-col">
      <Feed />
    </main>
  );
}
