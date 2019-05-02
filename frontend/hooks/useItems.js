import { useState, useEffect } from "react";

function useItems() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:8080/items");
      const data = await result.json();
      setItems(data || []);
    };
    fetchData();
  }, []);
  return items;
}

export default useItems;
