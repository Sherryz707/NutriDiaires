import Postlist from "@/app/_components/PostList";
import { getAllPosts } from "@/sanity/lib/client";
import Generic from "@/app/_components/Layouts/Generic";
import empty from "@/public/empty.svg"
export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto mt-10">
      {posts.length <= 0 ? <Generic title="Nothing to see here....." desc="Come back another time!" image={empty}>{""}</Generic>:<Postlist posts={posts} />}
    </div>
  );
}
