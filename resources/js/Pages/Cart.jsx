import Button from "@/Components/Button";
import Table from "@/Components/Table/Table";
import CartContext from "@/Contexts/CartContext";
import Main from "@/Layouts/Main";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import React, { useContext } from "react";
import { toast } from "react-toastify";

export default function Cart({ errors }) {
  const { cart, dispatch } = useContext(CartContext);
  const handleRemoveFromCart = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item.id });
    notify(`Vous avez supprimé le ${item.name} du panier`);
  };
  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    notify("Vous avez vidé le panier");
  };
  const itemsCount = cart.items.reduce(
    (value, item) => (value += Number(item.quantity)),
    0
  );
  const totalPrice = cart.items.reduce(
    (value, item) => (value += item.quantity * item.price),
    0
  );
  const handleCreateOrder = () => {
    Inertia.post(
      route("orders.store"),
      {
        items: cart.items,
        total: totalPrice,
        itemsCount: itemsCount,
      },
      {
        onBefore: () => dispatch({ type: "CLEAR_CART" }),
      }
    );
  };
  const notify = (message) => toast(message);
  if (cart.items.length === 0) {
    return (
      <Main>
        <h1 className="text-2xl">Votre panier est vide</h1>
        <p>
          Retournez à{" "}
          <Link href={route("home")} className="text-violet-600">
            la boutique
          </Link>
        </p>
      </Main>
    );
  }
  return (
    <Main>
      <h1 className="text-2xl">Votre panier</h1>
      <Button className="bg-red-700 mt-4" handleClick={handleClearCart}>
        Videz le panier
      </Button>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-4/6">
          <Table>
            <Table.Thead>
              <Table.Row>
                <Table.Th>Image</Table.Th>
                <Table.Th>Nom</Table.Th>
                <Table.Th>Prixe</Table.Th>
                <Table.Th>Quantité</Table.Th>
                <Table.Th>Total</Table.Th>
                <Table.Th>Total</Table.Th>
              </Table.Row>
            </Table.Thead>
            <Table.Tbody>
              {cart.items.map((item) => {
                return (
                  <Table.Row key={item.id}>
                    <Table.Td>
                      <Link href={route("products.detail", item.slug)}>
                        {" "}
                        <img
                          src={item.images[0].url}
                          alt={`Image of ${item.name}`}
                          className="w-32 h-16"
                        />
                      </Link>
                    </Table.Td>
                    <Table.Td>
                      <Link href={route("products.detail", item.slug)}>
                        {item.name}
                      </Link>
                    </Table.Td>
                    <Table.Td>${item.price}</Table.Td>
                    <Table.Td>{item.quantity}</Table.Td>
                    <Table.Td>${item.quantity * item.price}</Table.Td>
                    <Table.Td>
                      <svg
                        onClick={() => handleRemoveFromCart(item)}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </Table.Td>
                  </Table.Row>
                );
              })}
            </Table.Tbody>
          </Table>
        </div>
        <div className="mt-8 w-2/6">
          <div className="p-4 flex flex-col gap-4 bg-white rounded-lg shadow-lg">
            <p>Produits: ({itemsCount})</p>
            <p>Toatl: ${totalPrice}</p>
            <Button handleClick={handleCreateOrder}>Commandez</Button>
          </div>
        </div>
      </div>
    </Main>
  );
}
