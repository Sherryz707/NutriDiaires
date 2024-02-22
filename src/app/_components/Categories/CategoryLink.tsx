import type { CategoryDetz } from "@/sanity/types";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { paths } from "@/app/utils/pathhelper";
import DynamicTag from "../DynamicTag";
import { Suspense } from "react";

export default function CategoryLink({ category }: { category: CategoryDetz }) {
  const categoryImageProps = category?.mainImage
    ? urlForImage(category.mainImage)
    : null;

  return (
    <li
      className="category-item group post-1 sm:py-4 md:py-3"
      role="listitem"
      key={category.slug.current}
    >
      <div className="flex  gap-3 flex-row items-center justify-center">
        {categoryImageProps ? (
          <figure className="flex-shrink-0 rounded-full transition-all duration-500 hover:-translate-y-1">
            <Image
              className="h-12 w-12 rounded-full object-cover"
              src={categoryImageProps.src}
              alt={category.mainImage.alt}
              placeholder="blur"
              blurDataURL={category.mainImage.blurDataURL}
              height={48}
              width={48}
            />
          </figure>
        ) : null}
        <div className="min-w-0 flex-1">
          <Suspense>
            <DynamicTag
              title={category.title}
              slug={category.slug.current}
              pageQuery={paths.Category(category.slug.current)}
            />
          </Suspense>
        </div>
      </div>
    </li>
  );
}
