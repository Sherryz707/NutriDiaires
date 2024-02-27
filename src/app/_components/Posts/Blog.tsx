import { Suspense } from "react";
import AuthorCard from "../Homepage/Authorcard";
import RelatedPosts from "./RelatedPosts";
import Accordion from "./Accordion";
import Breadcrumbs from "./Breadcrumbs";
import Blogheader from "./Blogheader";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import SidebarMobile from "./SidebarMobile";
import { SinglePost } from "@/sanity/types";
import { PortableTextComponent } from "@/sanity/plugins/Portabletext";
import { paths } from "@/app/utils/pathhelper";
import { BlogPosting, WithContext } from "schema-dts";
export default function Blog({
  post,
  outline,
}: {
  post: SinglePost;
  outline: any;
  }) {
  
  const imageProps = post?.mainImage ? urlForImage(post.mainImage) : null;
  const postjsonLd: WithContext<BlogPosting> = {
     '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `/post/${post.slug.current}`,
    'headline':post.title,
    'name': post.title,
    'abstract': post.excerpt,
    'timeRequired': `${post.estReadingTime}M`,
    'articleSection': `${post.categories?post.categories[0].title:'none'}`,
    'author': {
      '@type': 'Person',
      'name': post?.author?.name ?? "anonymous",
    }, 'datePublished': post.publishedAt || post._createdAt,
    'dateCreated': post._createdAt,
    'creativeWorkStatus':'published',
    'image': imageProps?.src,
    'mainEntityOfPage': `${paths.Posts(post.slug.current)}`,
    'publisher': {
      '@type': 'Organization',
      "name":'Bloom'
    },
    'keywords': `${post.categories && post.categories.length > 0 ? post?.categories.map((c) => { return c.title }) : []}`,
    'wordCount':post.estimatedWordCount
   }
  return (
    <article className="flex-1 flex flex-col items-center gap-5 min-w-screen-xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postjsonLd) }}
      />
      {post.categories ? <Breadcrumbs categories={post.categories} /> : null}

      <Blogheader
        title={post.title}
        publishedAt={post._updatedAt || post._createdAt}
        _createdAt={post._createdAt}
        author={post.author}
        estReadingTime={post.estReadingTime}
      />
      <div className=" relative aspect-video max-w-screen-lg overflow-hidden min-w-full">
        {imageProps ? (
          <Image
            src={imageProps?.src}
            className="rounded-md object-cover"
            alt="Main blog post"
            fill
            sizes="100vw"
            loading="eager"
            placeholder="blur"
            blurDataURL={post.mainImage.blurDataURL}
          />
        ) : null}
      </div>

     <Suspense fallback={<p>Loading......</p>}>
        <Accordion title="Table of Contents" key="table-of-contents" num={0} size="lg">
          <SidebarMobile outline={outline} />
        </Accordion>
      </Suspense>
      <div className="prose prose-strong:text-primary prose-em:text-primary mx-auto my-3 prose-a:text-blue-600 lg:min-w-full text-text_clr dark:prose-invert prose-headings:text-primary prose-ol:text-text_clr prose-ul:text-text_clr prose-li:text-text_clr ">
        {post.body && <PortableTextComponent value={post.body} />}
      </div>
      {post.author? <AuthorCard author={post.author} />:null}
      {post.related && post.related.length>0 ? <RelatedPosts relatedPostz={post.related} />:null}
    </article>
  );
}
