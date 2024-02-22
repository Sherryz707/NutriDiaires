import { urlForImage } from "@/sanity/lib/image";
import { Author, ImageAdd, SinglePostAuthor } from "@/sanity/types";
import Image from "next/image";
import type { Image as typeImg } from "sanity";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export default function Blogheader({
  title,
  publishedAt,
  _createdAt,

  author,
  estReadingTime,
}: {
  title: string;
  publishedAt: string;
  _createdAt: string;
  author: SinglePostAuthor;
  estReadingTime: number;
}) {
  const formattedDate = formatDate(_createdAt || publishedAt);

  const AuthorimageProps = author?.image ? urlForImage(author.image) : null;
  return (
    <header aria-labelledby="blog-title">
      <h1
        id="blog-title"
        className="text-center text-3xl font-bold text-text_clr"
      >
        {title}
      </h1>
      <div className="flex items-center space-x-4 rtl:space-x-reverse justify-center mt-4">
        {AuthorimageProps ? (
          <figure className="flex-shrink-0">
            <Image
              className="h-8 w-8 rounded-full object-cover "
              src={AuthorimageProps.src}
              height={53}
              width={53}
              alt={author.name}
            />
          </figure>
        ) : null}
        <div>
          <p
            className="truncate text-base font-medium text-primary"
            aria-label={`Author's Name: ${author.name}`}
          >
            {author.name}
          </p>
          <div className="flex gap-3">
            <time
              className="text-xs text-gray_text font-medium"
              dateTime={publishedAt || _createdAt}
              aria-label="Published Date: October 21, 2022"
            >
              {formattedDate}
            </time>
            <time
              className="text-xs font-medium "
              dateTime={`PT${estReadingTime}M`}
              aria-label="Estimated Reading Time: 20 minutes"
            >
              {estReadingTime} min read
            </time>
          </div>
        </div>
      </div>
    </header>
  );
}
