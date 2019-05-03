import { useState, useEffect } from "react";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

function useCustomers() {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${publicRuntimeConfig.BACKEND}customers`);
      const data = await res.json();
      setCustomers(data);
    }

    fetchData();
  }, []);

  return [customers];
}

export default useCustomers;
