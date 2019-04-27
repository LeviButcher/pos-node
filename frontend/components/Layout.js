import Nav from "./Nav";
import Meta from "./Meta";
import styled, { ThemeProvider } from "styled-components";
import Theme from "./Theme";
import { POSProvider, POSReducer } from "../context/POSContext";

const Layout = styled.main`
  min-height: 100vh;
`;

function withLayout(Page) {
  return () => (
    <POSProvider
      reducer={POSReducer}
      initialState={{ customer: {}, cartItems: [] }}
    >
      <ThemeProvider theme={Theme}>
        <Layout>
          <Meta />
          <Nav />
          <Page />
        </Layout>
      </ThemeProvider>
    </POSProvider>
  );
}

export default withLayout;
