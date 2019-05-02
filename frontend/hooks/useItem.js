import { useState, useEffect } from "react";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

function useItem(id) {
  const [item, setItem] = useState();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${publicRuntimeConfig.BACKEND}items/${id}`);
      const apiItem = await res.json();
      setItem(apiItem);
    }
    fetchData();
  }, []);

  return item;
}

export default useItem;
