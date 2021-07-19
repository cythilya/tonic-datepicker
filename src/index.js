import { StrictMode } from "react";
import ReactDOM from "react-dom";
import {
  ColorModeProvider,
  ColorStyleProvider,
  CSSBaseline,
  ThemeProvider
} from "@trendmicro/react-styled-ui";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ThemeProvider>
      <ColorModeProvider value="light">
        <ColorStyleProvider>
          <CSSBaseline />
          <App />
        </ColorStyleProvider>
      </ColorModeProvider>
    </ThemeProvider>
  </StrictMode>,
  rootElement
);
