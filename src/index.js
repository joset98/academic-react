import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from "react-router-dom";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { theme, GlobalStyle, themeMui } from "styles";

// import {
//   ThemeProvider as ThemeProviderMui,
//   StylesProvider,
// } from "@material-ui/core/styles";
import {
  ThemeProvider as ThemeProviderMui,
  StyledEngineProvider as StylesProvider,
} from "@mui/material";
import { ThemeProvider } from "styled-components";

// import DateFnsUtils from "@date-io/date-fns";
import esLocale from "date-fns/locale/es";
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Main() {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const windowTheme = window?.env?.theme;

  return (
    <BrowserRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={{ ...theme, ...windowTheme }}>
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}> */}
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
            <ThemeProviderMui theme={themeMui(theme)}>
              <GlobalStyle />
              <App />
            </ThemeProviderMui>
          </LocalizationProvider>
          {/* </MuiPickersUtilsProvider> */}
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  );
}
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
