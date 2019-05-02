import useItems from "../hooks/useItems";
import styled from "styled-components";
import Link from "next/link";
import Table from "../styled/Table";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const ItemTable = () => {
  const [items, setRecall] = useItems();
  return (
    <Table>
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
          <Item item={item} key={item.sku} callBack={() => setRecall(true)} />
        ))}
      </tbody>
    </Table>
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

const Item = ({ item, callBack }) => {
  async function deleteItem(id) {
    const res = await fetch(`${publicRuntimeConfig.BACKEND}items/${id}`, {
      method: "DELETE"
    });
    if (res.status == 204) {
      alert("Item Deleted");
      callBack();
    } else {
      console.log("ERROR DELETING ITEM");
      console.log("res", res);
    }
  }

  return (
    <tr>
      <td>{item.sku}</td>
      <td>{item.description}</td>
      <td>{item.price}</td>
      <td>{item.available}</td>
      <td>
        <button>
          <Link
            as={`/items/update/${item._id}`}
            href={`/updateItem?id=${item._id}`}
          >
            <a>Update</a>
          </Link>
        </button>
      </td>
      <td>
        <button onClick={() => deleteItem(item._id)}>Delete</button>
      </td>
    </tr>
  );
};

export default ItemTable;
