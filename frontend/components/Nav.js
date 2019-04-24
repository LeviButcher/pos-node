import styled from "styled-components";

const TopNav = styled.nav`
  background-color: #444;
  padding: ${props => props.theme.padding};
  padding-top: calc(${props => props.theme.padding} / 2);
  padding-bottom: calc(${props => props.theme.padding} / 2);
  display: flex;
  grid-area: header;
  height: 3rem;

  & > a {
    padding-right: 1rem;
  }
`;

const Nav = () => {
  return (
    <TopNav>
      <a>POS-Node</a>
      <a>Transaction</a>
      <a>Customers</a>
      <a>Items</a>
    </TopNav>
  );
};

export default Nav;
