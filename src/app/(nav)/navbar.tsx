import Link from "next/link";
import ProfileButton from "./profile-btn";

export default function Navbar() {
  return (
    <header className="sticky top-0 border-2">
      <div className="flex flex-wrap justify-between mx-6 text-primary">
        <Link href="/" className="font-bold text-2xl">
          Bukom
        </Link>
        <ProfileButton />
      </div>
    </header>
  );
}
