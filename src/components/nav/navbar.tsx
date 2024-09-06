import Link from "next/link";
import ProfileButton from "./profile-btn";
import SearchField from "./search-field";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-12 flex-row items-center justify-between border-b-2 bg-background px-6">
      <div className="flex h-full w-28 flex-wrap items-center lg:w-[calc(20%+4rem)]">
        <Link href="/" className="text-2xl font-bold">
          BUKOM
        </Link>
      </div>
      <div className="hidden h-full w-full items-center border-x-2 px-2 sm:flex">
        <SearchField />
      </div>
      <div className="flex h-full items-center border-x-2 sm:hidden">
        <ProfileButton />
      </div>
    </header>
  );
}
