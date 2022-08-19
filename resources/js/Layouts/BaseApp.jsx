import React from "react";
import useCart from "@/Hooks/useCart";
import CartContext from "@/Contexts/CartContext";

export default function BaseApp({ App }) {
  const [cart, dispatch] = useCart();
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {App}
    </CartContext.Provider>
  );
}
