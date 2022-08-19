import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function ProductItem({
  id,
  slug,
  image,
  name,
  price,
  category,
}) {
  return (
    <div className="bg-white shadow-lg rounded-lg">
      <Link href={route("products.detail", slug)}>
        <img
          src={image}
          alt={`Image of ${name}`}
          className="w-full max-h-32 rounded-t-lg"
        />
      </Link>
      <div className="px-2 py-4 flex gap-2 flex-col items-center bg-white">
        <Link href={route("products.detail", slug)}>
          <div className="text-lg font-semibold">{name}</div>
        </Link>
        <Link
          href={route("by.category", category)}
          className="text-rose-600 text-sm font-bold"
        >
          {category}
        </Link>
        <p className="text-gray-600 mt-4 font-bold">${price}</p>
      </div>
    </div>
  );
}
