"use client";

import { useEffect, useState } from "react";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      if (!res.ok) {
        console.log("Error fetching in Client API request: ");
      }
      const result = await res.json();

      console.log(result);
    };
    fetchData();
  }, []);

  return <main>Hello World</main>;
}
