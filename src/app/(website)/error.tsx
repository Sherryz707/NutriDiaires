"use client";
import { useEffect } from "react";
import errorImg from "@/public/errorImg.svg";
import Generic from "../_components/Layouts/Generic";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Generic
      title="Awww Snap!"
      desc={` Something went terribly wrong. Please try again...`}
      image={errorImg}
    >
      <button
        className="group/btn inline-flex items-center rounded-lg bg-primary px-3 py-2 text-center text-sm font-medium text-pink-50 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-100"
        onClick={() => reset()}
        aria-label="Retry"
      >
        Try again
        <span className="group-hover/btn:translate-x-1 pl-2 transition-all duration-300">
          -&gt;
        </span>
      </button>
    </Generic>
  );
}
