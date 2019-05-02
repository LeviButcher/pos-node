import useItems from "../hooks/useItems";
import styled from "styled-components";
import Link from "next/link";

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

// TODO: Make Update links
function ItemLink({ item, text }) {
  return (
    <Link href={`/items/${item._id}`}>
      <a>{text}</a>
    </Link>
  );
}

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
