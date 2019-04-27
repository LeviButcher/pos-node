import styled from "styled-components";
import CustomerDetails from "./CustomerDetails";
import { usePOSState } from "../context/POSContext";

const CartSection = styled.section`
  height: 100%;
  display: grid;
  grid-template-rows: 10% 80% 10%;
  grid-template-columns: auto;
`;

const CartContainer = styled.div`
  height: 100%;
  background: #fff;
  color: #333;
  overflow-y: auto;
  padding: ${props => props.theme.padding};

  & > div {
    margin-bottom: 15px;
  }
`;

const CartItemContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto;
`;

const ButtonContainer = styled.div`
  padding: calc(${props => props.theme.padding} / 2)
    ${props => props.theme.padding};
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 5px;
`;

const CartItem = ({ item }) => (
  <CartItemContainer>
    <div>
      <h6>SKU: {item.sku}</h6>
      <p>{item.description}</p>
    </div>
    <div>
      <p>{item.price}</p>
      <p># {item.quantity}</p>
    </div>
    <button>Drop Item</button>
  </CartItemContainer>
);

const Cart = () => {
  const [{ cartItems }, dispatch] = usePOSState();
  return (
    <CartSection>
      <CustomerDetails />
      <CartContainer>
        <p>Total: {cartItems.reduce(totalCartReducer, 0)}</p>
        <hr />
        {cartItems.map(item => (
          <CartItem item={item} />
        ))}
      </CartContainer>
      <ButtonContainer>
        <button onClick={() => dispatch({ type: "CLEAR-CART" })}>
          Clear Cart
        </button>
        <button>Pay</button>
      </ButtonContainer>
    </CartSection>
  );
};

function totalCartReducer(acc, cur) {
  const sum = cur.quantity * cur.price;
  return acc + sum;
}

export default Cart;
