import { SinglePostRelatedPost } from "@/sanity/types";
import FeaturedPost from "./FeaturedPosts";

export default function RelatedPosts({
  relatedPostz,
}: {
  relatedPostz: SinglePostRelatedPost[];
}) {
  return (
    <section className="mt-7 w-full" aria-labelledby="related-posts-heading">
      <h2
        id="related-posts-heading"
        className="text-2xl font-bold text-primary text-center mb-5"
      >
        Related Posts
      </h2>
      <div className="my-1 flex gap-3 flex-col md:flex-row mx-auto max-w-md md:max-w-full justify-around">
        {relatedPostz.map((post) => (
          <FeaturedPost post={post} key={post.slug.current} />
        ))}
      </div>
    </section>
  );
}
