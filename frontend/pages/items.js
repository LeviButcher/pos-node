import styled from "styled-components";
import withLayout from "../components/Layout";
import ItemTable from "../components/ItemTable";

const ItemsPage = () => {
  return (
    <section>
      <header>
        <h1>Items in Inventory</h1>
      </header>
      <ItemTable />
    </section>
  );
};

export default withLayout(ItemsPage);
