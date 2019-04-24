import Cart from "./Cart";
import styled from "styled-components";

const SideStyle = styled.aside`
  background: ${props => props.theme.colors.accent};
  height: 100%;
  max-height: 100%;
`;

const SidePanel = () => {
  return (
    <SideStyle>
      <Cart />
    </SideStyle>
  );
};

export default SidePanel;
