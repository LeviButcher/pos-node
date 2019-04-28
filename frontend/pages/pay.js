import styled from "styled-components";
import withLayout from "../components/Layout";
import SidePanel from "../components/SidePanel";
import ItemList from "../components/ItemList";
import { TwoPanel } from "./index";
import PayForm from "../components/PayForm";

const Pay = () => (
  <TwoPanel>
    <SidePanel style={{ gridArea: "side" }} />
    <div style={{ gridArea: "main" }}>
      <PayForm />
    </div>
  </TwoPanel>
);

export default withLayout(Pay);
