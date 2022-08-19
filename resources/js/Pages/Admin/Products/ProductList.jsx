import React from "react";
import Admin from "@/Layouts/Admin";
import Table from "@/Components/Table/Table";
import { Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

export default function CreateProduct({ auth, errors, products }) {
  const handleDelete = (e, product) => {
    e.preventDefault();
    const url = route("products.destroy", product);
    Inertia.delete(url, {
      data: {
        id: product.id,
      },
    });
  };
  return (
    <Admin auth={auth} errors={errors} header="Tous produits">
      <div className="overflow-x-auto relative  sm:rounded-lg mt-8">
        <Table>
          <Table.Thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
            <Table.Row>
              <Table.Th>#</Table.Th>
              <Table.Th>Nom</Table.Th>
              <Table.Th>Prix</Table.Th>
              <Table.Th>Quantité</Table.Th>
              <Table.Th>actions</Table.Th>
            </Table.Row>
          </Table.Thead>
          <Table.Tbody>
            {products.map((product, i) => {
              return (
                <Table.Row
                  key={product.id}
                  className={`bg-white ${i % 2 != 0 ? "bg-gray-100" : ""}`}
                >
                  <Table.Td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                    {product.id}
                  </Table.Td>
                  <Table.Td className="py-4 px-6">{product.name}</Table.Td>
                  <Table.Td className="py-4 px-6">${product.price}</Table.Td>
                  <Table.Td className="py-4 px-6 text-center">
                    {product.quantity}
                  </Table.Td>
                  <Table.Td className="py-4 px-6 flex gap-4">
                    <Link
                      href={route("products.edit", product)}
                      className="tex-xs text-blue-700"
                    >
                      modifiez
                    </Link>
                    <Link
                      onClick={(e) => handleDelete(e, product)}
                      className="tex-xs text-red-700"
                    >
                      supprimez
                    </Link>
                  </Table.Td>
                </Table.Row>
              );
            })}
          </Table.Tbody>
        </Table>
      </div>
    </Admin>
  );
}
