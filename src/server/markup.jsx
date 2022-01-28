import React from "react";
import path from "path";
import fs from "fs";
import "date-fns";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { theme, GlobalStyle, themeMui } from "styles";

import {
  ServerStyleSheets,
  ThemeProvider as ThemeProviderMui,
  StylesProvider,
} from "@material-ui/core/styles";
import { ThemeProvider } from "styled-components";

import DateFnsUtils from "@date-io/date-fns";
import esLocale from "date-fns/locale/es";
import runtimeConfig from './config';
import App from "../App";

export default async (req, res, next) => {
  const context = {};
  const sheets = new ServerStyleSheets();

  const markup = renderToString(
    sheets.collect(
      <StaticRouter context={context} location={req.url}>
        <StylesProvider injectFirst>
          <ThemeProvider theme={{...theme, ...runtimeConfig(req.get('host')).theme}}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
              <ThemeProviderMui theme={themeMui(runtimeConfig(req.get('host')).theme)}>
                <GlobalStyle />
                <App />
              </ThemeProviderMui>
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </StylesProvider>
      </StaticRouter>
    ),
  );

  const css = sheets.toString();

  req.staticStyles = await fs.readFileSync(
    path.resolve(__dirname, "../src/App.css"),
    "utf8"
  );

  req.ico = `${runtimeConfig(req.get('host')).theme.config.images}logo.ico`; 
  req.markup = markup;
  req.css = css;

  if (context.url) {
    return res.redirect(context.url);
  }
  return next();
};
