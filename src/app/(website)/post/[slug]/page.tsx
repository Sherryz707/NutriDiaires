import { parseOutline } from "@/app/utils/TOC";
import Blog from "@/app/_components/Posts/Blog";
import Sidebar from "@/app/_components/Posts/Sidebar";
import { getAllPostsSlugs, getPostBySlug } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import AuthorCard from "@/app/_components/Homepage/Authorcard";
import RelatedPosts from "@/app/_components/Posts/RelatedPosts";

export async function generateStaticParams() {
  const post = await getAllPostsSlugs();
  return post;
}
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  return { title: post.title, description: post.excerpt };
}

export default async function Posts({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post || !post.body) {
    notFound();
  }
  const outline = post.body?parseOutline(post.body):[];

  return (
    <div className="mx-auto mt-14 flex max-w-screen-xl flex-col gap-5 px-5 md:flex-row">
      <Blog post={post} outline={outline} />
      <Sidebar outline={outline} />
    </div>
  );
}
