import Head from "next/head";
import { createGlobalStyle } from "styled-components";

/*
  Meta component defined meta data for Head in HTML
  and setup global styles on body/html tags
 */

const GlobalStyle = createGlobalStyle`
  html, body {
    background: ${props => props.theme.bg};
    font: 16px menlo;
    color: #fff;
    margin: ${props => props.theme.layoutMargin};
    padding: ${props => props.theme.layoutPadding};
  }
`;

const Meta = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <GlobalStyle />
    </>
  );
};

export default Meta;