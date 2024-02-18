import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex h-screen bg-red-300 "> {children}</div>;
}
