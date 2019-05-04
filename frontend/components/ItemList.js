import Items from "./items";
import styled from "styled-components";
import { usePOSState } from "../context/POSContext";
import { useState, useEffect } from "react";
import useItems from "../hooks/useItems";
import Button from "../styled/Button";

const ItemCard = styled.article`
  background: #ccc;
  margin: 2rem;
  width: 250px;
`;

const ItemSection = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: start;
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
  const [quantity, setQuantity] = useState(1);
  const [{ items }, dispatch] = usePOSState();

  function submitForm(e) {
    e.preventDefault();
    dispatch({ type: "ADD-ITEM", cartItem: { item, quantity } });
  }

  return (
    <ItemCard>
      <form onSubmit={submitForm}>
        <img src={item.picUrl || "hello"} />
        <h3>SKU: {item.sku}</h3>
        <h4>${item.price}</h4>
        <p>{item.description}</p>
        <h5>In stock: {item.available}</h5>
        <label>Add Quantity</label>
        {item.available > 0 && (
          <input
            name="quantity"
            type="number"
            min={1}
            max={item.available}
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
          />
        )}
        <Button type="submit">Add</Button>
      </form>
    </ItemCard>
  );
};

export default ItemList;
