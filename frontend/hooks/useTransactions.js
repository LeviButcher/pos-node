import { useState, useEffect } from "react";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${publicRuntimeConfig.BACKEND}transactions`);
      const data = await res.json();
      setTransactions(data);
    }

    fetchData();
  }, []);

  return [transactions];
}

export default useTransactions;
