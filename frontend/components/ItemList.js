import Items from "./items";
import styled from "styled-components";
import { usePOSState } from "../context/POSContext";
import { useState, useEffect } from "react";
import useItems from "../hooks/useItems";

const ItemCard = styled.article`
  padding: ${props => props.theme.padding};
  background: #fff;
  color: #000;
  margin: 2rem;
`;

const ItemSection = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: ${props => props.theme.padding};
  overflow-y: auto;
  max-height: inherit;
`;

const ItemList = () => {
  const [items] = useItems();

  return (
    <ItemSection>
      {items.map(item => (
        <Item item={item} key={item.sku} />
      ))}
    </ItemSection>
  );
};

const Item = ({ item }) => {
  const [cartItem, setCartItem] = useState(item);
  const [{ items }, dispatch] = usePOSState();

  function changeQuantity(e) {
    setCartItem({ ...cartItem, quantity: e.target.value });
  }

  function submitForm(e) {
    e.preventDefault();
    dispatch({ type: "ADD-ITEM", item: cartItem });
  }

  return (
    <ItemCard>
      <form onSubmit={submitForm}>
        <img src={cartItem.picUrl || "hello"} />
        <h3>SKU: {cartItem.sku}</h3>
        <h4>${cartItem.price}</h4>
        <p>{cartItem.description}</p>
        <h5>In stock: {cartItem.available}</h5>
        <label>Add Quantity:</label>
        <input
          name="quantity"
          type="number"
          min={0}
          max={cartItem.available}
          value={cartItem.quantity}
          onChange={changeQuantity}
        />
        <input type="submit" />
      </form>
    </ItemCard>
  );
};

export default ItemList;
