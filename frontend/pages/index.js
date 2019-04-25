import styled from "styled-components";
import withLayout from "../components/Layout";
import SidePanel from "../components/SidePanel";

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
      <Title>Cart Items go here</Title>
    </div>
  </TwoPanel>
);

export default withLayout(Index);
