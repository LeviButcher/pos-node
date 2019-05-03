import styled from "styled-components";
import Link from "next/link";

const TopNav = styled.nav`
  color: ${props => props.theme.colors.primary};
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
  & > a:visited {
    color: ${props => props.theme.colors.primaryDark};
  }
`;

const Nav = () => {
  return (
    <TopNav>
      <Link href="/">
        <a>POS-Node</a>
      </Link>
      <Link href="/transactions">
        <a>Transactions</a>
      </Link>
      <Link href="/customers">
        <a>Customers</a>
      </Link>
      <Link href="/items">
        <a>Items</a>
      </Link>
    </TopNav>
  );
};

export default Nav;
