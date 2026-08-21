import NextAuthProvider from "@/components/providers/NextAuthProvider";
import ReduxProvider from "@/components/providers/ReduxProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VortexChat",
  description:
    "A realtime chat app where you can chat with other users directly or in a group.",
  icons: {
    icon: "/globe.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <NextAuthProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
