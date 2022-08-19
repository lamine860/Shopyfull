import React from "react";

export default function Spinner({ label }) {
  return (
    <button className="bg-gray-900 text-white px-2 py-2 flex gap-2 items-center mt-5 rounded-lg">
      <div className="border border-white border-4 border-x-gray-900 h-8 w-8 rounded-full animate-in spin-in-[360deg] duration-1000 repeat-infinite "></div>
      {label && <>Traitement ...</>}
    </button>
  );
}
