import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Map",
};

export default function MapLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
