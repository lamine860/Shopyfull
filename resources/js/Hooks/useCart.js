import cartReducer from "@/Reducers/CartReducers";
import { useReducer } from "react";

export default function useCart() {
  const cartFromStorage = localStorage.getItem("cart");
  const initailSate = cartFromStorage
    ? JSON.parse(cartFromStorage)
    : { items: [] };
  return useReducer(cartReducer, initailSate);
}
