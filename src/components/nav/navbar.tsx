import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 h-12 items-center border-2 bg-background">
      <div className="mx-6 flex h-full flex-wrap items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          BUKOM
        </Link>
      </div>
    </header>
  );
}
