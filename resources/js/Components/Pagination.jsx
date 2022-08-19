import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function Pagination({
  nextPage,
  prevPage,
  currentPage,
  lastPage,
}) {
  return (
    <div className="flex gap-4">
      <Link href={prevPage} className="cursor-pointer" disabled>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w ${
            currentPage == 1 || currentPage < 1 ? "cursor-not-allowed" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        </svg>
      </Link>
      <Link href={nextPage} className="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w ${
            currentPage == lastPage ? "cursor-not-allowed" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>
    </div>
  );
}
