import { useState, useEffect } from "react";
import Router from "next/router";
import { Form, Input, Label } from "../styled/Form";
import styled from "styled-components";

const FormSection = styled.section`
  width: 750px;
  margin: auto;
`;

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
    <FormSection>
      <Form onSubmit={submitForm}>
        <header>
          <h1>Add a New Item</h1>
        </header>
        <Label htmlFor="sku">SKU</Label>
        <Input
          id="sku"
          type="text"
          onChange={onChange}
          name="sku"
          value={item.sku}
        />
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          type="text"
          onChange={onChange}
          name="description"
          value={item.description}
        />
        <Label htmlFor="picUrl">PicURL</Label>
        <Input
          id="picUrl"
          type="text"
          onChange={onChange}
          name="picUrl"
          value={item.picUrl}
        />
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          onChange={onChange}
          name="price"
          value={item.price}
        />
        <Label htmlFor="available">Quantity In Stock</Label>
        <Input
          id="available"
          type="number"
          onChange={onChange}
          name="available"
          value={item.available}
        />
        <Input type="submit" />
      </Form>
    </FormSection>
  );
};

export default ItemForm;
