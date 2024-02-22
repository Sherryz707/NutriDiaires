import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./context/Providers";
import { getSettings } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { Organization, WithContext } from "schema-dts";

const inter = Inter({ subsets: ["latin"] });


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="flex min-h-screen flex-col w-full">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
