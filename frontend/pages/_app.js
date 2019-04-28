import React from "react";
import App, { Container } from "next/app";
import { POSProvider, POSReducer, defaultState } from "../context/POSContext";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <POSProvider reducer={POSReducer} initialState={defaultState}>
          <Component {...pageProps} />
        </POSProvider>
      </Container>
    );
  }
}

export default MyApp;
