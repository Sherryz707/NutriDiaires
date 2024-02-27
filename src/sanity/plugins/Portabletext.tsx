// @ts-nocheck
//import { generateSlugPortableHeading } from "@/app/utils/TOC";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { urlForImage } from "../lib/image";
import Image from "next/image";
export const generateSlugPortableHeading = (text) => {
  let heading:string = text[0]?.props?.text || "";
  console.log(text,"check",heading,"final",heading
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-*/, "")
    .replace(/-*$/, ""))
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-*/, "")
    .replace(/-*$/, "");
}
const ImageComponent = ({ value }) => {
  return (
      <Image
        src={urlForImage(value)}
        alt={value.alt || "Image"}
        loading="lazy"
        className="object-cover"
        sizes="(max-width: 800px) 100vw, 800px"
        placeholder="blur"
        blurDataURL={value.blurDataURL}
      />
   
  );
};
const IframePreview = ({ value }:any) => {
  let { url, height } = value;
  if (!url) {
    return <p>Missing Embed URL</p>;
  }
  
  return (
    <iframe
      src={url}
      width="100%"
      height={height || "350"}
      className={!height ? "aspect-video rounded-md" : "aspect-square rounded-md"}
      frameBorder="0"
      allowFullScreen
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
    ></iframe>
  );
};
const components = {
  types: {
    image: ImageComponent,
    //   code: Code,
       embed: IframePreview,
    //   tables: PortableTextTable,
  },
  block: {
    h1: ({ children }: any) => (
      <h1 id={children}>{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 id={generateSlugPortableHeading(children)}>{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 id={generateSlugPortableHeading(children)}>{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 id={generateSlugPortableHeading(children)}>{children}</h4>
    ),
    h5: ({ children }: any) => (
      <h5 id={generateSlugPortableHeading(children)}>{children}</h5>
    ),
    h6: ({ children }: any) => (
      <h6 id={generateSlugPortableHeading(children)}>{children}</h6>
    ),
  },
  marks: {
    center: (props) => <div className="text-center">{props.children}</div>,
    highlight: (props) => (
      <span className="font-bold text-primary" style={{backgroundColor:`text-primary`}}>{props.children}</span>
    ),
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/") ? "noopener" : undefined;
      const target = !value.href.startsWith("/") ? "_blank" : undefined;
      return (
        <Link href={value.href} rel={rel} target={target} className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" style={{textDecoration:'underline',color:'#4299e1'}}>
          {children}
        </Link>
      );
    },
    internalLink: ({ children, value }) => {
      return <Link href={`/post/${value?.slug?.current}`} className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">{children}</Link>;
    },
  },
};
export const PortableTextComponent = (props: any) => {
  return <PortableText value={props.value} components={components} />;
};
