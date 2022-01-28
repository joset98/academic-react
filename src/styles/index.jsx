import { createGlobalStyle } from "styled-components";
import GlobalTheme from "./theme";
import GlobalThemeMui from "./material-ui";
import reset from "./reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    margin: 0;
    font-family: Nunito, sans-serif;
  }
`;

export const theme = GlobalTheme;
export const themeMui = GlobalThemeMui;
