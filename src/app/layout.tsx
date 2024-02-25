import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./context/Providers";
import { getSettings } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { Organization, WithContext } from "schema-dts";
import Script from 'next/script';
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
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.AnalyticsId || ""}`}
      />
      <Script id='gtag'>
      {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${process.env.AnalyticsId || ""});`}
    </Script>
    </html>
  );
}
