import styled from "styled-components";
import withLayout from "../components/Layout";
import SidePanel from "../components/SidePanel";
import ItemList from "../components/ItemList";

const Title = styled.h1`
  color: red;
`;

const TwoPanel = styled.section`
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 25% 1fr;
  grid-template-areas: "side main";
  min-height: calc(100vh - 3rem);
`;

const Index = () => (
  <TwoPanel>
    <SidePanel style={{ gridArea: "side" }} />
    <div style={{ gridArea: "main" }}>
      <ItemList />
    </div>
  </TwoPanel>
);

export default withLayout(Index);
