import React, { useContext } from "react";
import Main from "@/Layouts/Main";
import Button from "@/Components/Button";
import { Inertia } from "@inertiajs/inertia";
import FormGroup from "@/Components/Form/FormGroup";
import { useForm } from "@inertiajs/inertia-react";
import ProductItem from "@/Components/Products/ProductItem";
import CartContext from "@/Contexts/CartContext";

export default function Product({ similarProducts, product }) {
  const { _, dispatch } = useContext(CartContext);
  const { data, setData, errors, setError, clearErrors } = useForm({
    quantity: 0,
  });
  const handleChange = () => {
    clearErrors("quantity");
    if (data.quantity <= 0) {
      setError("quantity", "La quantité est incorrect!");
    } else if (product.quantity < data.quantity) {
      setError(
        "quantity",
        `Quantité non disponible en stock! (${product.quantity}) disponible`
      );
    } else {
      dispatch({
        type: "ADD_TO_CART",
        payload: { ...product, quantity: data.quantity },
      });
      Inertia.visit("/cart");
    }
  };
  return (
    <Main>
      <div className="flex flex-col md:flex-row gap-4 bg-white rounded-lg">
        <img
          src={product.images[0].url}
          alt={`Image of ${product.name}`}
          className="w-full md:w-2/4 rounded-l-lg shadow-lg flex-1 max-h-96"
        />
        <div className="py-8 px-4 flex-1">
          <h1 className="text-4xl">{product.name}</h1>
          <p className="text-gray-500 font-bold mt-2">${product.price}</p>
          <p className="text-sm">Category: {product.category}</p>
          <p className="text-sm">Marque: {product.brand}</p>
          <p className="text-gray-700">{product.description}</p>
          <div className="flex items-center w-full">
            <div className="w-full">
              <FormGroup error={errors.quantity}>
                <FormGroup.Label>Ajoutez une quantité</FormGroup.Label>
                <FormGroup.Control
                  type="number"
                  name="quantity"
                  value={data.quantity}
                  handleChange={setData}
                  error={errors.quantity}
                />
              </FormGroup>
            </div>
            <div>
              <Button
                handleClick={handleChange}
                className={`${!errors.quantity && "mt-6"} py-3`}
              >
                Ajoutez
              </Button>
            </div>
          </div>
        </div>
      </div>
      {similarProducts.length > 0 && (
        <>
          <h2 className="text-2xl mt-12 mb-2">Des Produits similaires</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {similarProducts.map((product) => {
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
        </>
      )}
    </Main>
  );
}
