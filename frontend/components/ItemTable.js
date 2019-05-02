import useItems from "../hooks/useItems";
import styled from "styled-components";

const ItemTable = () => {
  const items = useItems();
  return (
    <table>
      <thead>
        <tr>
          <th>SKU</th>
          <th>Description</th>
          <th>Price</th>
          <th>Available</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <Item item={item} />
        ))}
      </tbody>
    </table>
  );
};

const Item = ({ item }) => {
  return (
    <tr>
      <td>{item.sku}</td>
      <td>{item.description}</td>
      <td>{item.price}</td>
      <td>{item.available}</td>
    </tr>
  );
};

export default ItemTable;
