import useItems from "../hooks/useItems";
import styled from "styled-components";
import Link from "next/link";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button
} from "@material-ui/core";

const ItemTable = () => {
  const [items, setRecall] = useItems();
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>SKU</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Available</TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map(item => (
          <Item item={item} key={item.sku} callBack={() => setRecall(true)} />
        ))}
      </TableBody>
    </Table>
  );
};

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
    <TableRow>
      <TableCell>{item.sku}</TableCell>
      <TableCell>{item.description}</TableCell>
      <TableCell>{item.price}</TableCell>
      <TableCell>{item.available}</TableCell>
      <TableCell>
        <Button color="primary" variant="outlined">
          <Link
            as={`/items/update/${item._id}`}
            href={`/updateItem?id=${item._id}`}
          >
            <a>Update</a>
          </Link>
        </Button>
      </TableCell>
      <TableCell>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => deleteItem(item._id)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ItemTable;
