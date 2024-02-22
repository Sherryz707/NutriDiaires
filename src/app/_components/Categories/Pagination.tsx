"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  pageIndex: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  pagesQuery: string;
  prevId: string | null;
  nextId: string | null;
}
export default function Pagination({
  pageIndex,
  isFirstPage,
  isLastPage,
  pagesQuery,
  prevId,
  nextId,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const handleNextPage = () => {
    if (!nextId) {
      return;
    }
    params.delete("prev");
    params.set("page", (pageIndex + 1).toString());
    params.set("next", nextId);
    const page = params.toString();
    router.push(`${pagesQuery}?${page}`);
  };

  const handlePrevPage = () => {
    if (!nextId) {
      router.back();
    }
    if (!prevId) {
      return;
    }
    params.delete("next");
    params.set("page", (pageIndex - 1).toString());
    params.set("prev", prevId);
    const page = params.toString();
    router.push(`${pagesQuery}?${page}`);
  };

  return (
    <div className="mt-10 flex items-center justify-center">
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <button
          disabled={isFirstPage}
          onClick={handlePrevPage}
          className="group/prev relative inline-flex items-center gap-1 rounded-l-md border border-primary px-3 py-2 pr-4 text-sm font-medium text-text_clr hover:bg-primary  focus:z-20 disabled:pointer-events-none disabled:opacity-40 bg-bg_lvl1_clr"
        >
          <span>
            <span className="group-hover/prev:translate-x-1 pr-2 transition-all duration-300">
              &lt;-
            </span>
            Previous
          </span>
        </button>
        <button
          disabled={isLastPage}
          onClick={handleNextPage}
          className="group/next relative inline-flex items-center gap-1 rounded-r-md border border-primary px-3 py-2 pr-4 text-sm font-medium  hover:bg-primary  focus:z-20 disabled:pointer-events-none disabled:opacity-40 bg-bg_lvl1_clr text-text_clr"
        >
          <span>Next</span>
          <span className="group-hover/next:translate-x-1 pl-2 transition-all duration-300">
            -&gt;
          </span>
        </button>
      </nav>
    </div>
  );
}
