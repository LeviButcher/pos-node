import Nav from "./Nav";
import Meta from "./Meta";
import styled, { ThemeProvider } from "styled-components";
import Theme from "./Theme";

const Layout = styled.main`
  min-height: 100vh;
`;

function withLayout(Page) {
  return () => (
    <ThemeProvider theme={Theme}>
      <Layout>
        <Meta />
        <Nav />
        <Page />
      </Layout>
    </ThemeProvider>
  );
}

export default withLayout;
