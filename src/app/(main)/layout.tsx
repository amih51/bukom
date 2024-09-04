import Navbar from "@/components/nav/navbar";
import MenuBar from "@/components/nav/menubar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-grow flex-row">
        <MenuBar />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
