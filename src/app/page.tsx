"use client";

import { useEffect, useState } from "react";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/products", {
          method: "GET",
        });
        if (!res.ok) {
          console.log("Error fetching in Client API request: ");
        }
        const result = await res.json();
        setData(result.product);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      {data?.map((product: { _id: string; name: string }) => (
        <h1 key={product._id}>{product.name}</h1>
      ))}
    </main>
  );
}
