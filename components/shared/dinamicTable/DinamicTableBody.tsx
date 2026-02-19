"use client";

import { useEffect, useState } from "react";
import { Product, getProducts } from "@/temp/serverActionSimulado";
import { DinamicTableSkeleton } from "./DinamicTableSkeleton";
import { motion } from "framer-motion";
import { Trash2, SquarePen, ChevronLeft, ChevronRight } from "lucide-react";
import { useFilterModal } from "@/stores/filter/filterStore";
import { useRouter } from "next/navigation";
import { BouncingButton } from "../bouncingButton/BouncingButton";

export function DinamicTableBody({
  pointer,
  columns,
}: {
  pointer: string;
  columns: string[];
}) {
  const [products, setProducts] = useState<Product>({ data: [], count: 0 });
  const [loading, setLoading] = useState(true);
  const { filter } = useFilterModal();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex-1 px-6 pb-6 overflow-y-auto scrollbar-custom"
      >
        <div className="relative w-full h-full overflow-x-auto overflow-y-auto scrollbar-custom">
          {loading ? (
            <DinamicTableSkeleton />
          ) : products.count === 0 ? (
            <p>No se encontró información</p>
          ) : (
            <table className="w-full">
              <thead className="sticky top-0 rounded-lg">
                <tr className="rounded-lg bg-neutral-100">
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className={`font-medium py-4 text-left text-green-950 ${
                        column === "Editar" || column === "Eliminar"
                          ? "px-3 lg:pl-3 md:px-4"
                          : "px-3"
                      }`}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {products.data.map((product, index) => (
                  <tr
                    key={product.id}
                    className={`border-b border-neutral-200 hover:bg-[#00A0D0]/10 transition-all duration-200 ${index % 2 ? "bg-neutral-100" : "bg-white"}`}
                  >
                    <td className="px-3 py-6 text-left whitespace-nowrap">
                      {product.id}
                    </td>
                    <td className="px-3 py-6 text-left whitespace-nowrap">
                      {product.name}
                    </td>
                    <td className="px-3 py-6 text-left whitespace-nowrap">
                      ${product.price}
                    </td>
                    <td className="px-3 py-6 text-left whitespace-nowrap">
                      {product.stock}
                    </td>
                    <td className="px-3 py-6 whitespace-nowrap">
                      <motion.div
                        onClick={() =>
                          router.push(
                            `/reports/${pointer}/update/${product.id}`,
                          )
                        }
                        className="p-2 rounded-lg hover:cursor-pointer w-fit hover:bg-blue-100"
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <SquarePen className="size-4 text-yellow-600" />
                      </motion.div>
                    </td>
                    <td className="px-3 py-6 whitespace-nowrap">
                      <motion.div
                        onClick={() => /* openEditDeleteModal(
                              dato.usuario.id,
                              dato,
                              "ELIMINAR",
                            ) */ {}}
                        className="p-2 rounded-lg hover:cursor-pointer w-fit hover:bg-red-100"
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <Trash2 className="size-4 text-red-600" />
                      </motion.div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
      <div className="flex flex-col justify-center p-6 lg:justify-between md:justify-between lg:flex-row md:flex-row">
        <div>
          <p>
            Total:{" "}
            <span className="font-semibold text-[#00A0D0]">
              {loading ? "Cargando" : products.count}
            </span>{" "}
            resultados
          </p>
        </div>
        <div className="flex gap-4">
          <BouncingButton
            action={() => {}}
            backgroundColorHover="#ffffff"
            backgroundColor="#e5e5e5"
            textColor="#000"
            textColorHover="#00A0D0"
            border="2px solid #ffffff"
            borderHover="2px solid #00A0D0"
            twClassName="w-fit h-fit px-4 py-2 rounded-xl"
          >
            <ChevronLeft className="size-5" />
            <p>Anterior</p>
          </BouncingButton>
          <BouncingButton
            action={() => {}}
            backgroundColorHover="#ffffff"
            backgroundColor="#e5e5e5"
            textColor="#000"
            textColorHover="#00A0D0"
            border="2px solid #ffffff"
            borderHover="2px solid #00A0D0"
            twClassName="w-fit h-fit px-4 py-2 rounded-xl"
          >
            <p>Siguiente</p>
            <ChevronRight className="size-5" />
          </BouncingButton>
        </div>
        <div>
          <p>
            {loading ? (
              <p>Cargando...</p>
            ) : (
              <p>
                Página: {(filter?.page ?? 0) + 1} de{" "}
                {Math.ceil(products.count ?? 0) / (filter?.perPage ?? 1) === 0
                  ? "1"
                  : Math.ceil((products.count ?? 0) / (filter?.perPage ?? 1))}
              </p>
            )}
          </p>
        </div>
      </div>
    </>
  );
}
