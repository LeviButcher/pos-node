import { useState, useEffect } from "react";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

//TODO: Only make recall happen ONCE
function useItems() {
  const [items, setItems] = useState([]);
  const [recall, setRecall] = useState(false);

  useEffect(
    () => {
      const fetchData = async () => {
        const result = await fetch(`${publicRuntimeConfig.BACKEND}items`);
        const data = await result.json();
        setItems(data || []);
      };
      console.log("Running HOOK");
      fetchData();
      return () => {
        setRecall(false);
      };
    },
    [recall]
  );
  return [items, setRecall];
}

export default useItems;
