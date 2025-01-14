import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar/NavBar";
import { Toaster } from "@/components/ui/toaster";
import {ClerkProvider} from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS E-commerce Store Project",
  description:
    "An E-commerce website project created with NextJS, Supabase, Prisma, Clerk authentication, TypeScript, Zod, Tailwind and Shadcn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang='en'>
      <body className={inter.className}>
        <NavBar />
        <div>{children}</div>
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}
