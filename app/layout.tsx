import NextAuthProvider from "@/components/providers/NextAuthProvider";
import ReduxProvider from "@/components/providers/ReduxProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
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
          <ReduxProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </ReduxProvider>
        </NextAuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
