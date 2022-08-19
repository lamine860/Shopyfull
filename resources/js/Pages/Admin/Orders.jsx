import Pagination from "@/Components/Pagination";
import Table from "@/Components/Table/Table";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import React from "react";
import Admin from "@/Layouts/Admin";
import { toast } from "react-toastify";

export default function Orders({ orders, auth }) {
  const notify = (msg) => toast(msg);
  const handleDelete = (id) => {
    Inertia.delete(route("admin.orders.destroy", id), {
      data: {
        _method: "delete",
      },
      onSuccess: () => notify("La commade à été supprimé avec success."),
    });
  };
  const handleDelivered = (id) => {
    Inertia.put(route("admin.orders.delivered", id), {
      data: {
        _method: "put",
      },
      onSuccess: () => notify("La commande est marqué comme livrer."),
    });
  };
  return (
    <Admin auth={auth} header="Toutes les commandes">
      <div className="max-w-5xl m-auto">
        <div className="flex flex-col">
          <Table>
            <Table.Thead>
              <Table.Row>
                <Table.Th>#ID</Table.Th>
                <Table.Th>Montant</Table.Th>
                <Table.Th>Payer</Table.Th>
                <Table.Th>Livrer</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>ACTIONS</Table.Th>
              </Table.Row>
            </Table.Thead>
            <Table.Tbody>
              {orders.data.map((order) => {
                return (
                  <Table.Row key={order.id}>
                    <Table.Td>
                      <Link href={route("orders.show", order.id)}>
                        {order.id}
                      </Link>
                    </Table.Td>
                    <Table.Td>
                      <div className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {order.total}
                      </div>
                    </Table.Td>
                    <Table.Td>
                      {order.paid ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6  text-green-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-red-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                    </Table.Td>
                    <Table.Td>
                      {order.delivered ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6  text-green-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-red-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                    </Table.Td>
                    <Table.Td>{order.created_at.substring(0, 7)}</Table.Td>
                    <Table.Td>
                      <div className="flex gap-2 items-center">
                        {!order.delivered && (
                          <button
                            onClick={() => handleDelivered(order.id)}
                            className="text-xs bg-gray-900 px-2 py-1 text-white uppercase"
                          >
                            livrer
                          </button>
                        )}
                        <svg
                          onClick={() => handleDelete(order.id)}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-red-700 cursor-pointer"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </div>
                    </Table.Td>
                  </Table.Row>
                );
              })}
            </Table.Tbody>
          </Table>
        </div>
        <div className="max-w-md m-auto mt-8 flex  justify-center">
          <Pagination
            nextPage={orders.next_page_url}
            prevPage={orders.prev_page_url}
            currentPage={orders.current_page}
            lastPage={orders.last_page}
          />
        </div>
      </div>
    </Admin>
  );
}
