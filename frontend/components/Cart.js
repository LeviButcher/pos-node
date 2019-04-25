import styled from "styled-components";
import CustomerDetails from "./CustomerDetails";

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

const CartItems = [
  {
    sku: 12341,
    description: "Hairdryer",
    picURL: "",
    quantity: "2",
    available: "4",
    price: 2.29
  },
  {
    sku: 12341,
    description: "Hairdryer",
    picURL: "",
    quantity: "2",
    available: "4",
    price: 2.29
  },
  {
    sku: 12341,
    description: "Hairdryer",
    picURL: "",
    quantity: "2",
    available: "4",
    price: 2.29
  },
  {
    sku: 12341,
    description: "Hairdryer",
    picURL: "",
    quantity: "2",
    available: "4",
    price: 2.29
  },
  {
    sku: 12341,
    description: "Hairdryer",
    picURL: "",
    quantity: "2",
    available: "4",
    price: 2.29
  },
  {
    sku: 12341,
    description: "Hairdryer",
    picURL: "",
    quantity: "2",
    available: "4",
    price: 2.29
  },
  {
    sku: 12341,
    description: "Hairdryer",
    picURL: "",
    quantity: "2",
    available: "4",
    price: 2.29
  },
  {
    sku: 12341,
    description: "Hairdryer",
    picURL: "",
    quantity: "2",
    available: "4",
    price: 2.29
  }
];

const CartItemContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto;
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
  return (
    <CartSection>
      <CustomerDetails />
      <CartContainer>
        {CartItems.map(item => (
          <CartItem item={item} />
        ))}
      </CartContainer>
      <div>
        <p>Total: </p>
        <button>Clear Cart</button>
        <button>Pay</button>
      </div>
    </CartSection>
  );
};

export default Cart;
