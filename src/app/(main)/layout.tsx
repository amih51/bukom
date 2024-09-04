import Navbar from "@/components/nav/navbar";
import MenuBar from "@/components/nav/menubar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-shrink-0 flex-col bg-background">
      <Navbar />
      <div className="flex flex-grow flex-row">
        <MenuBar className="sticky left-0 top-12 hidden max-h-[calc(100vh-3rem)] w-fit flex-grow border sm:flex md:px-6 lg:w-1/5" />
        <div className="w-full">{children}</div>
      </div>
      <MenuBar className="sticky bottom-0 flex w-full bg-background sm:hidden" />
    </div>
  );
}
