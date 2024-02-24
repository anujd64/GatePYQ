import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/globals.css";
import Header from "../components/ui/Header";
import { cn } from "@/app/_lib/utils";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GATE PYQ",
  description: "A website to practice gate pyqs.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-slate-800 to-slate-900">
        <SessionProvider session={session}>
          <main className={cn("text-white flex flex-col",inter.className)}>
          <Header text="GatePYQ"/>
          {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
