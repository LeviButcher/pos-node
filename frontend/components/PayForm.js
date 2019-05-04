import styled from "styled-components";
import { useState } from "react";
import { totalCartReducer } from "./Cart";
import { usePOSState } from "../context/POSContext";
import Router from "next/router";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const PaymentTypes = ["Cash", "Credit Card"];

const PayForm = () => {
  const [{ customer, cartItems }, dispatch] = usePOSState();
  const minimumOwed = cartItems
    .map(ele => ({ price: ele.item.price, quantity: ele.quantity }))
    .reduce(totalCartReducer, 0);
  const [payment, setPayment] = useState({ amountPayed: minimumOwed });

  function updateState(e) {
    const name = e.target.name;
    const value = e.target.value;
    setPayment({
      ...payment,
      [name]: value
    });
  }

  async function submitForm(e) {
    e.preventDefault();
    alert("Add in Are you sure check, CALLING BACKEND");
    const transaction = {
      cartItems: cartItems,
      payment
    };
    if (customer === {}) {
      transaction.customer = customer;
    }
    console.log(transaction);
    const res = await fetch(`${publicRuntimeConfig.BACKEND}transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(transaction)
    });
    if (res.status == 201) {
      console.log("We GUCCI");
      // const data = await res.json();
      console.log(res);
      dispatch({ type: "WIPE" });
      Router.push("/");
    } else {
      alert("display error messages");
      console.log(res);
    }
  }

  return (
    <div>
      <h1>Finish Transaction</h1>
      <h3>
        {customer.firstName || "Shopper"} owes {minimumOwed}
      </h3>
      <form onSubmit={submitForm}>
        <label>Type in exact payment</label>
        <input
          name="amountPayed"
          type="number"
          min={minimumOwed}
          onChange={updateState}
          value={payment.amountPayed}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default PayForm;
