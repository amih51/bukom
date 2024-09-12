import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex h-1/6 items-center justify-center border-2">
      <Link href={"https://github.com/amih51/bukom"} target="_blank">
        about
      </Link>
    </footer>
  );
}
