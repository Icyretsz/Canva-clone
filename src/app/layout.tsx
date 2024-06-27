import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {PagesProvider} from "@/context/page-context"
import Header from '@/layout/header'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Header/>
      <PagesProvider>
              {children}
      </PagesProvider>
      </body>
    </html>
  );
}
