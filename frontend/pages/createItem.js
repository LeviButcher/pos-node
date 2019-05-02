import withLayout from "../components/Layout";
import { useState } from "react";
import Router from "next/router";
import ItemForm from "../components/ItemForm";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const CreateItem = () => {
  return (
    <div>
      <ItemForm onSubmit={createItemRequest} />
    </div>
  );
};

async function createItemRequest(item) {
  const res = await fetch(`${publicRuntimeConfig.BACKEND}items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(item)
  });
  if (res.status === 201) {
    //if 201, navigate to /items
    alert(`ITEM CREATED: ${item.sku}`);
    Router.push("/items");
  } else {
    //catch errors here!
  }
}

export default withLayout(CreateItem);
