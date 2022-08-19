import React, { useContext, useEffect, useState } from "react";
import Main from "@/Layouts/Main";
import ProductItem from "@/Components/Products/ProductItem";
import { Link } from "@inertiajs/inertia-react";
import Pagination from "@/Components/Pagination";

export default function Home({ products, category, categories }) {
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    if (query != "") {
      const filtred = products.data.filter((product) => {
        return product.name.includes(query);
      });
      setFilteredProducts(filtred);
    } else {
      setFilteredProducts(products.data);
    }
  }, [query]);
  return (
    <Main query={{ query, setQuery }}>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="py-2">
          <ul className="flex flex-col gap-4">
            <li
              className={`py-2 px-4 border-b ${
                route().current("home") ? "bg-gray-900 text-white" : ""
              }`}
            >
              <Link className="hover:underline" href="/">
                Toutes
              </Link>
            </li>
            {Object.values(categories).map((cat, i) => {
              return (
                <li
                  key={cat}
                  className={`py-2 px-4 ${
                    i != categories.length - 1 ? "border-b" : ""
                  }  ${cat === category ? "bg-gray-900 text-white" : ""}`}
                >
                  <Link
                    className="hover:underline"
                    href={route("by.category", cat)}
                  >
                    {cat}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="md:col-span-5">
          {filteredProducts.length > 0 ? (
            <div>
              {category ? (
                <h1 className="text-xl md:text-2xl py-4">
                  Les derniers produits de catégorie: {category}
                </h1>
              ) : (
                <h1 className="text-xl md:text-2xl pb-4">
                  Les derniers produits
                </h1>
              )}
            </div>
          ) : (
            <h1 className="text-xl md:text-2xl pb-4">
              Aucun resultat pour ({query})
            </h1>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => {
              return (
                <ProductItem
                  id={product.id}
                  slug={product.slug}
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.images[0].url}
                  category={product.category}
                />
              );
            })}
          </div>
        </div>
      </div>
      {filteredProducts.length > 0 && (
        <div className="max-w-md m-auto mt-16 flex justify-center">
          <Pagination
            nextPage={products.next_page_url}
            prevPage={products.prev_page_url}
            currentPage={products.current_page}
            lastPage={products.last_page}
          />
        </div>
      )}
    </Main>
  );
}
