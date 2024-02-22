import { getAllCategories } from "@/sanity/lib/client";
import CategoryLink from "./CategoryLink";

export default async function Sidebar() {
  const categories = await getAllCategories();

  return (
    <nav>
      <ul role="list" className="divide-y divide-gray-200">
        {categories.map((category) => (
          <CategoryLink category={category} key={category.slug.current} />
        ))}
      </ul>
    </nav>
  );
}

/* */
