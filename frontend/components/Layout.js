import Nav from "./Nav";
import Meta from "./Meta";
import { ThemeProvider } from "styled-components";
import Theme from "./Theme";

function withLayout(Page) {
  return () => (
    <ThemeProvider theme={Theme}>
      <div>
        <Meta />
        <div>
          <Nav />
        </div>
        <div>
          <p>Placeholder</p>
        </div>
        <Page />
      </div>
    </ThemeProvider>
  );
}

export default withLayout;
