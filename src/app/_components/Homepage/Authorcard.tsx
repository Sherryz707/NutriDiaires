import { urlForImage } from "@/sanity/lib/image";
import { Author, ImageAdd } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { Image as ImgType } from "sanity";

export default function AuthorCard({ author }:any) {
  
  const AuthorimageProps = author.image ? urlForImage(author.image) : null;
  return (
    <div className="w-full max-w-sm rounded-lg bg-bg_lvl1_clr p-7 shadow-sm shadow-shadow_post md:max-w-full group">
      <div className="flex flex-col md:flex-row justify-start gap-7 md:items-center lg:items-start">
        <div className="shrink-0">
          {AuthorimageProps ? (
            <figure className="flex flex-col items-center gap-3 lg:flex-row shrink-0">
              <Image
                className="mb-3 h-24 w-24 rounded-full object-cover shadow-lg shrink-0 ring-1 ring-primary"
                src={AuthorimageProps?.src}
                width={1000}
                height={1000}
                placeholder="blur"
                blurDataURL={author.image.blurDataURL}
                alt="Bonnie image"
                loading="lazy"
              />
            </figure>
          ) : (
            <figure className="mb-3 h-24 w-24 rounded-full bg-gray-500"></figure>
          )}
        </div>

        <div className="flex flex-col gap-4 text-text_clr md:max-w-xl items-center md:items-start">
          <div className="flex items-center flex-col gap-1 md:items-start">
            <h1 className="text-center text-2xl font-bold capitalize tracking-tight  text-text_clr">
              About
              <span className="text-2xl text-primary ms-2">{author.name}</span>
            </h1>
            <span className="text-sm text-gray_text text-center font-medium">
              {author.occupation || ""}
            </span>
          </div>

          <PortableText value={author.bio} />

          
        </div>
      </div>
    </div>
  );
}
