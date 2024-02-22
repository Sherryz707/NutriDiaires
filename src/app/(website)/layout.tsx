import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/app/_components/Header/Header";
import Footer from "@/app/_components/Header/Footer";
import { urlForImage } from "@/sanity/lib/image";
import { getSettings } from "@/sanity/lib/client";
import { Organization, WithContext } from "schema-dts";


async function sharedMetaData() {
  const settings = await getSettings();

  return {
    metadataBase: new URL(settings.url),
    title: {
      default:
        settings?.title ||
        "Bloom - Blossoming Creativity",
      template: "%s | Bloom"
    },
    description:
      settings?.description ||
      "Bloom: Unlock the Power of Next.js, Sanity, and Tailwind | Elevate your web projects with Bloom, a versatile template showcasing the seamless integration of Next.js, Sanity, and Tailwind CSS.",
    keywords: ["Next.js", "Sanity", "Tailwind CSS"],
    authors: [{ name: "Shahr Bano" }],
    canonical: settings?.url ?? "",
    openGraph: {
      images: [
        {
          url:
            urlForImage(settings?.openGraphImage)?.src ||
            "/img/opengraph.jpg",
          width: 800,
          height: 600
        }
      ]
    },
    twitter: {
      title: settings?.title || "Twitter",
      card: "summary_large_image"
    }
  };
}

export async function generateMetadata() {
  return await sharedMetaData();
}
export default async function layout({
  children,
}: {
  children: React.ReactNode;
  }) {
  const settings = await getSettings();
  const orgjsonLd: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    'name': `${settings.title}`,
    "url": `${settings.url}`,
    'description':`${settings.description}`,
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": `${settings.phone}`,
        "contactType": "customer service"
      }],
    "email": `${settings.email}`,
    'logo': `${urlForImage(settings?.logo)?.src || " "}`,
    "image": `${urlForImage(settings?.openGraphImage)?.src || " "}`,
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgjsonLd) }}
      />
      <Header title={settings.title} logoSvg={urlForImage(settings?.logo)?.src || ""} />
      {children}
      <Footer title={settings.title} logoSvg={urlForImage(settings?.logo)?.src || ""} copyright={settings.copyright} />
    </main>
  );
}
