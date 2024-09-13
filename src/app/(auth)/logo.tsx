"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export default function Logo() {
  const { theme } = useTheme();
  return (
    <>
      {theme === "dark" ? (
        <Image
          src={"/HMIFess-white-02.png"}
          alt={"HMIFess logo dark"}
          width={512}
          height={512}
        />
      ) : theme === "light" ? (
        <Image
          src={"/HMIFess-02.png"}
          alt={"HMIFess logo"}
          width={512}
          height={512}
        />
      ) : (
        <Image
          src={"/HMIFess-01.png"}
          alt={"HMIFess logo"}
          width={512}
          height={512}
        />
      )}
    </>
  );
}
