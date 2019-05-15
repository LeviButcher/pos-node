import { useState } from "react";
import { Form, Input, Label } from "../styled/Form";
import Spacer from "../styled/Spacer";
import { TextField, InputAdornment, Button } from "@material-ui/core";

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
        <TextField
          id="firstName"
          label="First Name"
          onChange={handleInput}
          margin="normal"
        />
        <TextField
          id="lastName"
          label="Last Name"
          onChange={handleInput}
          margin="normal"
        />
        <TextField
          id="streetAddress"
          label="Street Address"
          onChange={handleInput}
          margin="normal"
        />
        <TextField
          id="city"
          label="City"
          onChange={handleInput}
          margin="normal"
        />
        <TextField
          id="state"
          label="State"
          onChange={handleInput}
          margin="normal"
        />
        <TextField
          id="zipCode"
          label="Zip Code"
          type="Number"
          onChange={handleInput}
          margin="normal"
        />
        <TextField
          id="phone"
          label="Phone"
          type="tel"
          onChange={handleInput}
          margin="normal"
        />
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </Form>
    </Spacer>
  );
};

export default CustomerForm;
