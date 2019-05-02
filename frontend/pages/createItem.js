import withLayout from "../components/Layout";
import { useState } from "react";
import Router from "next/router";

const CreateItem = () => {
  return (
    <div>
      <ItemForm />
    </div>
  );
};

const ItemForm = () => {
  const [item, setItem] = useState({
    sku: "",
    description: "",
    picURL: "",
    price: 0,
    quantity: 0
  });

  function onChange(e) {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value
    });
  }

  async function submitForm(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/items", {
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
    console.log("res", res);
  }

  return (
    <section>
      <header>
        <h1>Add a New Item</h1>
      </header>
      <form onSubmit={submitForm}>
        <label htmlFor="sku">SKU</label>
        <input
          id="sku"
          type="text"
          onChange={onChange}
          name="sku"
          value={item.sku}
        />
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          onChange={onChange}
          name="description"
          value={item.description}
        />
        <label htmlFor="picURL">PicURL</label>
        <input
          id="picURL"
          type="text"
          onChange={onChange}
          name="picURL"
          value={item.picURL}
        />
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          onChange={onChange}
          name="price"
          value={item.price}
        />
        <label htmlFor="quantity">Quantity In Stock</label>
        <input
          id="quantity"
          type="number"
          onChange={onChange}
          name="quantity"
          value={item.quantity}
        />
        <input type="submit" />
      </form>
    </section>
  );
};

export default withLayout(CreateItem);
