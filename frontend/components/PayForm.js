import styled from "styled-components";
import { useState } from "react";
import { totalCartReducer } from "./Cart";
import { usePOSState } from "../context/POSContext";
import Router from "next/router";

const PaymentTypes = ["Cash", "Credit Card"];

// let payment = {
//   type: "",
//   amountPayed: "",
//   creditCardNumber: "",
//   securityNumber: ""
// };

const PayForm = () => {
  const [{ customer, cartItems }, dispatch] = usePOSState();
  const minimumOwed = cartItems.reduce(totalCartReducer, 0);
  const [payment, setPayment] = useState({ amountPayed: minimumOwed });

  function updateState(e) {
    const name = e.target.name;
    const value = e.target.value;
    setPayment({
      ...payment,
      [name]: value
    });
  }

  function submitForm(e) {
    e.preventDefault();
    //contain logic to check payment amount and items

    //update backend with transaction
    //wipe cart and customer from app state
    //reroute to transaction page
    alert("Calling Backend");
    dispatch({ type: "WIPE" });
    Router.push("/");
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
