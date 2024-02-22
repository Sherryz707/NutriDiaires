import { getPaginatedPosts } from "@/sanity/lib/client"
import GridLayout from "@/app/_components/Layouts/GridLayout";
import Generic from "@/app/_components/Layouts/Generic";
import empty from "@/public/empty.svg"
import { paths } from "@/app/utils/pathhelper";
import Pagination from "@/app/_components/Categories/Pagination";
import Post from "@/app/_components/Post";
import { Suspense } from "react";
import { Post as Posttype } from "@/sanity/types";
export default async function Category({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  let prevId = searchParams?.prev || null;
  let nextId: string | null = searchParams?.next || null;

  const page = searchParams?.page ?? "";
  const pageIndex = parseInt(page, 10) || 1;

  // Define the parameters for fetching posts based on the current page
  const paramsQ = {
    limit: parseInt(process.env.NEXT_PUBLIC_POSTS_PER_PAGE as string) || 3,
    prevId,
    nextId,
  };
  const posts = await getPaginatedPosts(paramsQ);

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
      {!posts || posts.length<=0?<Generic title="Whoops! You reached the end" desc="Hope you liked our writings :)" image={empty}>{""}</Generic>:<GridLayout>
        {posts.map((post: Posttype,index) => (
          <Post key={post._id} post={post} num={index} />
        ))}
      </GridLayout>}

      
        <Suspense>
          <Pagination
            pageIndex={pageIndex}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            pagesQuery={paths.Category("")}
            prevId={prevId}
            nextId={nextId}
          />
        </Suspense>
      
    </section>
  );
}
