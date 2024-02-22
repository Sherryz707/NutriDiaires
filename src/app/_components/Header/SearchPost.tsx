'use client'

import { paths } from "@/app/utils/pathhelper";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchPost() {
  const [query, setQuery] = useState("");
   const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query) return;
    params.delete("query");
    params.set("query",encodeURIComponent(query));
    const page = params.toString();
    router.push(`${paths.Search()}?${page}`);
    setQuery('');
  }

  return (
    <form className="max-w-md" onSubmit={handleSubmit}>
      <label className="mb-2 text-sm font-medium text-gray_text sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray_text "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          placeholder="Search blogs...."
                  className=" rounded-full bg-bg_lvl1_clr px-4 py-2 text-sm placeholder:text-gray_text focus:outline-none focus:ring focus:ring-primary shadow shadow-shadow_post p-4 ps-10 
          /w-28    transition-all duration-300  focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
          type="search"
          id="default-search"
          value={query}
        onChange={(e) => setQuery(e.target.value)}
          tabIndex={0}
        />
      </div>
    </form>
  );
}
// sm:w-64 sm:focus:w-72
