import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Docaz — A second opinion on endometriosis",
  description:
    "Get a specialist second opinion on your endometriosis diagnosis, treatment plan, or surgery — remotely, within days.",
  openGraph: {
    title: "Docaz — A second opinion on endometriosis",
    description:
      "Get a specialist second opinion on your endometriosis diagnosis, treatment plan, or surgery — remotely, within days.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
