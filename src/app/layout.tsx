import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/app/theme-provider";
import QueryProvider from "./query-provider";
import { Inter } from "next/font/google";
import localfont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });
const stretchPro = localfont({
  src: "../../public/fonts/stretch-pro.regular.ttf",
  variable: "--stretch-pro",
});

export const metadata: Metadata = {
  title: {
    template: "%s | HMIFess",
    default: "HMIFess",
  },
  description: "HMIFess",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "HMIFess",
  },
};

export const viewport: Viewport = {
  themeColor: "#0C0A09",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${stretchPro.variable}`}>
        <QueryProvider>
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
