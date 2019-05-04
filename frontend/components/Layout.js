import Nav from "./Nav";
import Meta from "./Meta";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Theme from "./Theme";

/*
  Meta component defined meta data for Head in HTML
  and setup global styles on body/html tags
 */

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  html, body {
    background: ${props => props.theme.bg};
    font: 16px sans;
    font-family: 'Roboto', sans-seriff;
    margin: ${props => props.theme.layoutMargin};
    padding: ${props => props.theme.layoutPadding};
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  h1 {
    font-size: 26px;
  }
  h2 {
    font-size: 24px;
  }
  h3 {
    font-size: 22px;
  }
  h4,h5,h6 {
    font-size: 20px;
  }
  p {
    font-size: 16px;
  }
`;

const Layout = styled.main`
  min-height: 100vh;
`;

function withLayout(Page) {
  return () => (
    <ThemeProvider theme={Theme}>
      <Layout>
        <Meta />
        <GlobalStyle />
        <Nav />
        <Page />
      </Layout>
    </ThemeProvider>
  );
}

export default withLayout;
