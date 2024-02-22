import {
  getAllCatSlugs,
  getPaginatedPostsByCategory,
} from "@/sanity/lib/client";

import { notFound } from "next/navigation";
import Generic from "@/app/_components/Layouts/Generic";
import empty from "@/public/empty.svg"
import { paths } from "@/app/utils/pathhelper";
import Pagination from "@/app/_components/Categories/Pagination";
import GridLayout from "@/app/_components/Layouts/GridLayout";
import Post from "@/app/_components/Post";
import { Post as Posttype } from "@/sanity/types";
import { Suspense } from "react";

export async function generateStaticParams() {
  const catSlugs = await getAllCatSlugs();

  return catSlugs
}
export async function generateMetadata({params}:{params:{slug:string}}) {
  return {
  title:`${params.slug.charAt(0).toUpperCase()+params.slug.slice(1)} | Category`
}
}
export default async function Category({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string };
}) {
  let prevId = searchParams?.prev || null;
  let nextId: string | null = searchParams?.next || null;
  // Set the number of posts to be displayed per page
  const page = searchParams?.page ?? ""
  const pageIndex = parseInt(page, 10) || 1;

  // Define the parameters for fetching posts based on the current page
  const paramsQ = {
    limit: parseInt(process.env.NEXT_PUBLIC_POSTS_PER_PAGE as string) || 3,
    prevId,
    nextId,
    keyword: params.slug,
  };

  const posts = await getPaginatedPostsByCategory(paramsQ);
  
  
  if (posts.length > 0) {
    prevId = posts[searchParams?.prev ? posts.length - 1 : 0]._id;
    nextId = posts[searchParams?.prev ? 0 : posts.length - 1]._id;
  } else {
    nextId = null; // Reached the end
  }
  // Check if the current page is the first or the last
  const isFirstPage = pageIndex < 2;
  const isLastPage =
    posts.length <
    (parseInt(process.env.NEXT_PUBLIC_POSTS_PER_PAGE as string, 10) || 3) || nextId===null;

  return (
   <section>
      {!posts || posts.length<=0?<Generic title="Whoops! No blogs to show" desc="Guess it's time to check out another Category" image={empty}>{""}</Generic>:<GridLayout>
        {posts.map((post: Posttype,index) => (
          <Post key={post._id} post={post} num={index} />
        ))}
      </GridLayout>}

      
        <Suspense>
          <Pagination
            pageIndex={pageIndex}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            pagesQuery={paths.Category(params.slug)}
            prevId={prevId}
            nextId={nextId}
          />
        </Suspense>
      
    </section>)
}
