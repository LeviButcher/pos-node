import { useState } from "react";

const CustomerForm = ({ submitAction }) => {
  const [customer, setCustomer] = useState({});

  function handleInput(e) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setCustomer({
      ...customer,
      [name]: value
    });
  }

  return (
    <div style={{ color: "#000" }}>
      <form onSubmit={e => submitAction(e, customer)}>
        <header>
          <h2>Add New Customer</h2>
        </header>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" onChange={handleInput} />
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="lastName" onChange={handleInput} />
        <label htmlFor="streetAddress">Street Address</label>
        <input id="streetAddress" name="streetAddress" onChange={handleInput} />
        <label htmlFor="city">City</label>
        <input id="city" name="city" onChange={handleInput} />
        <label htmlFor="state">State</label>
        <input id="state" name="state" onChange={handleInput} />
        <label htmlFor="zipCode">Zip Code</label>
        <input
          id="zipCode"
          name="zipCode"
          type="number"
          onChange={handleInput}
        />
        <label htmlFor="phone">Phone Number</label>
        <input id="phone" name="phone" type="tel" onChange={handleInput} />
        <input type="submit" />
      </form>
    </div>
  );
};

export default CustomerForm;
