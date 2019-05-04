import { useState } from "react";
import { Form, Input, Label } from "../styled/Form";
import Spacer from "../styled/Spacer";

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
    <Spacer>
      <Form onSubmit={e => submitAction(e, customer)}>
        <header>
          <h2>Add New Customer</h2>
        </header>
        <Label htmlFor="firstName">First Name</Label>
        <Input id="firstName" name="firstName" onChange={handleInput} />
        <Label htmlFor="lastName">Last Name</Label>
        <Input id="lastName" name="lastName" onChange={handleInput} />
        <Label htmlFor="streetAddress">Street Address</Label>
        <Input id="streetAddress" name="streetAddress" onChange={handleInput} />
        <Label htmlFor="city">City</Label>
        <Input id="city" name="city" onChange={handleInput} />
        <Label htmlFor="state">State</Label>
        <Input id="state" name="state" onChange={handleInput} />
        <Label htmlFor="zipCode">Zip Code</Label>
        <Input
          id="zipCode"
          name="zipCode"
          type="number"
          onChange={handleInput}
        />
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" name="phone" type="tel" onChange={handleInput} />
        <Input type="submit" />
      </Form>
    </Spacer>
  );
};

export default CustomerForm;
