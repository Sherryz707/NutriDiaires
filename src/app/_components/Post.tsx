import { Post } from "@/sanity/types";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { paths } from "@/app/utils/pathhelper";
import { formatDate } from "@/app/utils/formatDate";
import Link from "next/link";
import { BlogPosting, WithContext } from "schema-dts";
import category from "@/sanity/schemaTypes/category";

export default function Post({ post ,num}: { post: Post,num:number }) {
  const formattedDate = formatDate(post.publishedAt || post._createdAt);
  const imageProps = post?.mainImage ? urlForImage(post.mainImage) : null;
  const AuthorimageProps = post?.author?.image
    ? urlForImage(post.author.image)
    : null;
  const keyw=post.categories && post.categories.length>0?post?.categories.map((c)=>{return c.title}):[]
  const postjsonLd: WithContext<BlogPosting> = {
     '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `/post/${post.slug.current}`,
    'headline':post.title,
    'name': post.title,
    'creativeWorkStatus':'published',
    'abstract': post.excerpt,
    'timeRequired': `${post.estReadingTime}M`,
    'articleSection': `${post.categories?post.categories[0].title:'none'}`,
    'author': {
      '@type': 'Person',
      'name':post.author.name ||"anonymous"
    }, 'datePublished': post.publishedAt || post._createdAt,
    'dateCreated': post._createdAt,
    'image': imageProps?.src,
    'mainEntityOfPage': `${paths.Posts(post.slug.current)}`,
    'publisher': {
      '@type': 'Organization',
      "name":'Bloom'
    },'wordCount':post.estimatedWordCount,
    'keywords': `${post.categories && post.categories.length>0?post?.categories.map((c)=>{return c.title}):[]}`
   }
  return (
    <article className="group flex cursor-pointer justify-center">
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postjsonLd) }}
      />
      <div className="max-w-sm rounded-lg">
        {imageProps ? (
          <Link href={paths.Posts(post.slug.current)} >
            <Image
              src={imageProps.src}
              className="aspect-square rounded-lg object-cover shadow-sm hover:shadow-md hover:shadow-shadow_post brightness-90 contrast-125 hover:scale-105 transition-all  duration-500"
              height={imageProps.width}
              width={imageProps.height}
              alt={(post.mainImage.alt as string) || "Thumbnail"}
              placeholder="blur"
              blurDataURL={post.mainImage.blurDataURL}
              {...(num < 4 ? { priority: true } : { loading: "lazy" })}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
        ) : null}
        <div className="py-5">
          <h1>
            <Link
              href={paths.Posts(post.slug.current)}
              className="animatedUnderline text-2xl"
            >
              {post.title}
            </Link>
          </h1>

          <div className="my-5 flex items-center relative">
            {AuthorimageProps ? (
              <figure className="flex-shrink-0">
                <Image
                  className=" rounded-full object-cover"
                  src={AuthorimageProps?.src}
                  height={53}
                  width={53}
                  alt="Author Image"
                />
              </figure>
            ) : null}
            <div className="flex-1 flex flex-col">
              <div className="ms-4 min-w-0 ">
                <p className="truncate text-base font-semibold">
                  <span
                    className="text-primary"
                    aria-label={`Author: ${post.author?.name || ""}`}
                  >
                    {post.author?.name || ""}
                  </span>
                </p>
              </div>
              <div className="ms-4 inline-flex items-center text-sm font-medium text-gray_text ">
                <time dateTime={post.publishedAt || post._createdAt}>
                  {formattedDate}
                </time>
              </div>
            </div>
          </div>
          <p
            className="mb-5 text-text_clr font-medium truncate overflow-ellipsis line-clamp-3 text-wrap"
            aria-label="Brief description of the post"
          >
            {post.excerpt}
          </p>
          <div className="flex justify-between items-center">
            <Link
              href={paths.Posts(post.slug.current)}
              className="group/btn inline-flex items-center rounded-lg bg-primary px-3 py-2 text-center text-sm font-medium text-pink-50 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-100"
              aria-label={`Read more about ${post.title}`}
            >
              Read More
              <span className="group-hover/btn:translate-x-1 pl-2 transition-all duration-300">
                -&gt;
              </span>
            </Link>
            <span className="text-text_clr font-medium">
              {post.estReadingTime ?? 0} min read
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
