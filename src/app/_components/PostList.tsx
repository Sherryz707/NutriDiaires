import { getAllPosts } from "@/sanity/lib/client";
import Post from "./Post";
import GridLayout from "./Layouts/GridLayout";
import { Post as Posttype } from "@/sanity/types";

export default async function Postlist({ posts }: { posts: Posttype[] }) {
  
  return (
      <GridLayout>
        {posts.map((post,index) => (
          <Post key={post._id} post={post} num={index} />
        ))}
      </GridLayout>
  );
}
