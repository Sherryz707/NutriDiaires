import { paths } from "@/app/utils/pathhelper";
import Generic from "@/app/_components/Layouts/Generic";
import Postlist from "@/app/_components/PostList";
import {  searchPost } from "@/sanity/lib/client";
import Link from "next/link"
import notFound from "@/public/notFound.svg";
export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
    }) {
    const query=decodeURIComponent(searchParams?.query ?? "")
  const posts = await searchPost(query);
 
  
  return (
    <div className="container mx-auto mt-10">
      {(!posts || posts.length <= 0) ?<Generic title={`No Blogs found....`} desc="try another keyword!" image={notFound}><Link
        href={paths.home()}
        className="group/btn inline-flex items-center rounded-lg bg-primary px-3 py-2 text-center text-sm font-medium text-pink-50 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-100"
      >
        Go Back Home
        <span className="group-hover/btn:translate-x-1 pl-2 transition-all duration-300">
          -&gt;
        </span>
      </Link></Generic>  : <Postlist posts={posts} />}
    </div>
  );
}
