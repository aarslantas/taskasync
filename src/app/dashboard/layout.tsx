import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Sidebar from "Q/components/layout/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <header className="mb-8 bg-red-400">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </header>
        <div>{children}</div>
      </main>
    </div>
  );
}
