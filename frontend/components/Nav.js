import styled from "styled-components";

const TopNav = styled.nav`
  background-color: #444;
  padding: 1.5rem;
  display: flex;

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
