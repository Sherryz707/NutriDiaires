"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DynamicTag({
  title,
  slug,
  pageQuery,
}: {
  title: string;
  slug: string;
  pageQuery: string;
}) {
  const pathname = usePathname().split("/").pop();
  const active = pathname === slug;
  const DynamicTag = active ? "p" : Link;
  return (
    <DynamicTag
      href={`${pageQuery}`}
      className={`${
        active ? "text-primary" : "animatedUnderline"
      }  text-md font-semibold tracking-wider w-fit`}
      {...(active ? { "aria-current": "page" } : {})}
    >
      {title}
    </DynamicTag>
  );
}
