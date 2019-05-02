import { useState, useEffect } from "react";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

function useItems() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${publicRuntimeConfig.BACKEND}items`);
      const data = await result.json();
      setItems(data || []);
    };
    fetchData();
  }, []);
  return items;
}

export default useItems;
