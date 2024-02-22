import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import DynamicTag from "../DynamicTag";
import { paths } from "@/app/utils/pathhelper";
import Link from "next/link";
import { BlogPosting, WithContext } from "schema-dts";
import { SinglePostRelatedPost } from "@/sanity/types";

export default function FeaturedPost({ post }: {post:SinglePostRelatedPost}) {
  const imageProps = post?.mainImage ? urlForImage(post.mainImage) : null;
  const postjsonLd: WithContext<BlogPosting> = {
     '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `/post/${post.slug.current}`,
    'headline':post.title,
    'name': post.title,
    'author': {
      '@type': 'Person',
      'name':post.author.name ||"anonymous"
    }, 
    'image': imageProps?.src,
    'mainEntityOfPage': `${paths.Posts(post.slug.current)}`,
    'publisher': {
      '@type': 'Organization',
      "name":'Bloom'
    },
   }
  return (
    <article className="group sm:py-4 md:py-3">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postjsonLd) }}
      />
      <div className=" flex md:flex-col flex-row gap-3  ">
        {imageProps ? (
          <Link href={post.slug.current}>
            <figure className="aspect-square flex-shrink-0 transition-all duration-500 hover:-translate-y-2 relative h-auto rounded-md object-cover w-24 md:w-52 hover:shadow-md hover:shadow-shadow_post">
              <Image
                className="object-cover rounded-md"
                fill
                src={imageProps.src}
                placeholder="blur"
                blurDataURL={post.mainImage.blurDataURL}
                alt={post.mainImage.alt || "Thumbnail"}
                loading={"lazy"}
              />
            </figure>
          </Link>
        ) : null}
        <div className="md:max-w-[12rem] text-wrap">
          <div>
            <DynamicTag
              title={post.title}
              slug={post.slug.current}
              pageQuery={paths.Posts(post.slug.current)}
            ></DynamicTag>
          </div>
          <p className="mt-2 truncate text-sm font-semibold text-primary capitalize">
            {post.author.name}
          </p>
        </div>
      </div>
    </article>
  );
}
