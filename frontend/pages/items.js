import styled from "styled-components";
import withLayout from "../components/Layout";
import ItemTable from "../components/ItemTable";

const Contained = styled.section`
  padding: ${props => props.theme.padding};
`;

const ItemsPage = () => {
  return (
    <Contained>
      <header>
        <h1>Items in Inventory</h1>
      </header>
      <ItemTable />
    </Contained>
  );
};

export default withLayout(ItemsPage);
