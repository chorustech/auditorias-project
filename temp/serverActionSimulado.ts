"use server";

export type Product = {
  data: {
    id: number;
    name: string;
    price: number;
    stock: number;
  }[];
  count: number;
};

export async function getProducts(): Promise<Product> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return {
    data: [
      { id: 1, name: "Laptop", price: 15000, stock: 5 },
      { id: 2, name: "Mouse", price: 350, stock: 20 },
      { id: 3, name: "Teclado", price: 900, stock: 10 },
      { id: 4, name: "Laptop", price: 15000, stock: 5 },
      { id: 5, name: "Mouse", price: 350, stock: 20 },
      { id: 6, name: "Teclado", price: 900, stock: 10 },
      { id: 7, name: "Laptop", price: 15000, stock: 5 },
      { id: 8, name: "Mouse", price: 350, stock: 20 },
      { id: 9, name: "Teclado", price: 900, stock: 10 },
    ],
    count: 3,
  };
}
