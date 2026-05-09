import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "NotionX",
  description: "A powerful Notion clone for organizing your work and life",
};

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full overflow-hidden">
        <ThemeProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-200 h-full `}
          >
            <div className="h-full flex flex-col dark:bg-[#020817]">
              <Header className="sticky top-0 z-50 border-b" />
              <div className="flex-1 flex min-h-0">
                <Sidebar className="flex border-r overflow-y-auto" />
                <main className="flex-1 overflow-y-auto scrollbar-hide">
                  {children}
                </main>
              </div>
              <Toaster position="top-center" />
            </div>
          </body>
        </ThemeProvider>
      </html>
    </ClerkProvider>
  );
}
