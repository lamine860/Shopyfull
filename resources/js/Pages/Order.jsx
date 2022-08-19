import Table from "@/Components/Table/Table";
import Main from "@/Layouts/Main";
import { Link, useForm } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutFrom from "@/Components/Form/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import Spinner from "@/Components/Spinner";

const stripePromise = loadStripe("pk_test_sZSza9qT3t4HSJvUAbBHOFQ6");
export default function Order({ order }) {
  const [clientSecret, setClientSecret] = useState();
  const { setData, errors, data, post } = useForm({
    address: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
  });
  useEffect(() => {
    if (!order.paid) {
      (async () => {
        const { data } = await axios.get(route("create-intent", order));
        setClientSecret(data);
      })();
    }
  }, [order]);
  return (
    <Main>
      <h1 className="text-3xl py-4">Commande {order.reference}</h1>
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-md shadow-md ">
        <div className="mt-8 flex-1">
          <div className="flex flex-col">
            <h6 className="text-xl">Vos informations personnelles</h6>
            <p>
              Nom: <span className="font-bold">{order.user.name}</span>
            </p>
            <p>
              Email: <span className="font-bold">{order.user.email}</span>
            </p>
            <div className="border-t my-4"></div>
            <h6 className="text-xl">Status</h6>
            <p>
              Payer:{" "}
              <span className="font-bold inline-flex">
                {order.paid ? (
                  <span className="inline-flex items-center">
                    {order.paid_at}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                ) : (
                  "Non payer"
                )}
              </span>
            </p>
            <p>
              Délivrer:{" "}
              <span className="font-bold">
                {order.delivered ? order.delivered_at : "Non délivrer"}
              </span>
            </p>
            {order.paid && (
              <>
                <div className="border-t my-4"></div>
                <h6 className="text-xl">Votre adresse</h6>
                <p>
                  Adresse:{" "}
                  <span className="font-bold">
                    {order.addresses[0].address}
                  </span>
                </p>
                <p>
                  Ville:{" "}
                  <span className="font-bold">{order.addresses[0].city}</span>
                </p>
                <p>
                  Pays:{" "}
                  <span className="font-bold">
                    {order.addresses[0].country}
                  </span>
                </p>
                <p>
                  Phone:{" "}
                  <span className="font-bold">{order.addresses[0].phone}</span>
                </p>
                <p>
                  Code postal:{" "}
                  <span className="font-bold">
                    {order.addresses[0].postal_code}
                  </span>
                </p>
              </>
            )}
          </div>
          {!clientSecret && !order.paid ? (
            <Spinner label="Traitement ..." />
          ) : !order.paid ? (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutFrom />
            </Elements>
          ) : (
            ""
          )}
        </div>
        <div className="flex-1">
          <Table>
            <Table.Thead>
              <Table.Row>
                <Table.Th>Image</Table.Th>
                <Table.Th>Nom</Table.Th>
                <Table.Th>Prixe</Table.Th>
                <Table.Th>Quantité</Table.Th>
                <Table.Th>Total</Table.Th>
              </Table.Row>
            </Table.Thead>
            <Table.Tbody>
              {order.products.map((item) => {
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
                  </Table.Row>
                );
              })}
            </Table.Tbody>
          </Table>
          <p className="flex justify-end py-4 flex-col border-t mt-4 text-right">
            <span>Quantité de produits: {order.items_count}</span>
            <span>Tax: ${order.tax}</span>
            <span className="font-bold">Total: ${order.total}</span>
          </p>
        </div>
      </div>
    </Main>
  );
}
