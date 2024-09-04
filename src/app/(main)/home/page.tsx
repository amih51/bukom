import { Metadata } from "next";
import Navbar from "../../../components/nav/navbar";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <main className="flex w-full">
      <Navbar />
      <div className="flex flex-auto border-2 h-full">a</div>
      <div className="flex flex-auto border-2 h-full">a</div>
    </main>
  );
}
