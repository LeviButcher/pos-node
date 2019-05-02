import { useState, useEffect } from "react";
import Router from "next/router";

const defaultState = {
  sku: "",
  description: "",
  picUrl: "",
  price: 0,
  available: 0
};

const ItemForm = ({ onSubmit, data }) => {
  const [item, setItem] = useState(data || defaultState);
  useEffect(
    () => {
      if (data) {
        setItem(data);
      }
    },
    [data]
  );

  function onChange(e) {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value
    });
  }

  function submitForm(e) {
    e.preventDefault();
    onSubmit(item);
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
        <label htmlFor="picUrl">PicURL</label>
        <input
          id="picUrl"
          type="text"
          onChange={onChange}
          name="picUrl"
          value={item.picUrl}
        />
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          onChange={onChange}
          name="price"
          value={item.price}
        />
        <label htmlFor="available">Quantity In Stock</label>
        <input
          id="available"
          type="number"
          onChange={onChange}
          name="available"
          value={item.available}
        />
        <input type="submit" />
      </form>
    </section>
  );
};

export default ItemForm;
