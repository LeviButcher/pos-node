import styled from "styled-components";
import withLayout from "../components/Layout";
import SidePanel from "../components/SidePanel";
import ItemList from "../components/ItemList";

export const TwoPanel = styled.section`
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 25% 1fr;
  grid-template-areas: "side main";
  min-height: calc(100vh - 3rem);
  max-height: calc(100vh - 3rem);
`;

const MainContent = styled.div`
  max-height: inherit;
`;
const Index = () => (
  <TwoPanel>
    <SidePanel style={{ gridArea: "side" }} />
    <MainContent style={{ gridArea: "main" }}>
      <ItemList />
    </MainContent>
  </TwoPanel>
);

export default withLayout(Index);
