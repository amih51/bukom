import Link from "next/link";
import ProfileButton from "./profile-btn";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-12 flex-row items-center justify-between border-2 bg-background">
      <div className="flex h-full w-28 flex-wrap items-center pl-6 lg:w-[calc(20%+3rem)]">
        <Link href="/" className="text-2xl font-bold">
          BUKOM
        </Link>
      </div>
      <div className="ml-2 hidden w-full sm:inline">SearchBar</div>
      <div className="sm:hidden">
        <ProfileButton />
      </div>
    </header>
  );
}
