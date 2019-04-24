import styled from "styled-components";
import CustomerDetails from "./CustomerDetails";

const CartItems = [
  {
    sku: 12341,
    description: "",
    picURL: "",
    quantity: "2",
    available: "4",
    price: 2.29
  }
];

const CartItem = props => (
  <div>
    <h6>props.sku</h6>
    <p>props.description</p>
  </div>
);

const Cart = () => {
  return (
    <div>
      <CustomerDetails />
      <div>Cart Items</div>
      <div>Checkout box</div>
    </div>
  );
};

export default Cart;
