import styled from "styled-components";
import withLayout from "../components/Layout";
import ItemTable from "../components/ItemTable";
import Link from "next/link";
import { Button } from "@material-ui/core";

const Contained = styled.section`
  padding: ${props => props.theme.padding};

  & > header {
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
  }
`;

const ItemsPage = () => {
  return (
    <Contained>
      <header>
        <h1>Items in Inventory</h1>
        <Button color="primary" variant="contained">
          <Link href="/items/create">
            <a>Create Item</a>
          </Link>
        </Button>
      </header>
      <ItemTable />
    </Contained>
  );
};

export default withLayout(ItemsPage);
