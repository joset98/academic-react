/* eslint-disable no-undef */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { hydrate } from "react-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { theme, GlobalStyle, themeMui } from "styles";

import {
  ThemeProvider as ThemeProviderMui,
  StylesProvider,
} from "@material-ui/core/styles";
import { ThemeProvider } from "styled-components";

import DateFnsUtils from "@date-io/date-fns";
import esLocale from "date-fns/locale/es";
import App from "./App";

function Main() {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <BrowserRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={{...theme, ...window.env.theme}}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <ThemeProviderMui theme={themeMui(window.env.theme)}>
              <GlobalStyle />
              <App />
            </ThemeProviderMui>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  );
}

hydrate(
  <Main />,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
