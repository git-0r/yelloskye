"use client";

import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/sonner";
import Navigation from "@/components/navigation";

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satoshi.variable} antialiased mx-8 font-satoshi`}>
        <AuthProvider>
          <Navigation />
          {children}
        </AuthProvider>
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
