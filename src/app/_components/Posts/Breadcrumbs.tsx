import { paths } from "@/app/utils/pathhelper";
import { SinglePostCategories } from "@/sanity/types";
import Link from "next/link";

export default function Breadcrumbs({
  categories,
}: {
  categories: SinglePostCategories[];
}) {
  return (
    <ul
      aria-label="Breadcrumb"
      className="flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse gap-3 flex-wrap"
    >
      {categories.map((category) => (
        <Link
          href={paths.Category(category.slug.current)}
          key={category.slug.current}
          className="text-text_clr font-medium text-sm md:text-base tracking-wide bg-bg_lvl1_clr  rounded-full py-2 px-5 border border-primary"
        >
          {category.title}
        </Link>
      ))}
    </ul>
  );
}
