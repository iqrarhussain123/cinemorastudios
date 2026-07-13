import type { Metadata } from "next";
import { ScrollProgress } from "@/components/scroll-progress";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cinemora Studios",
  description: "We turn attention into clients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
