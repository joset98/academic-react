import { green, purple, grey } from '@mui/material/colors';

const breakpoints = ["600px", "960px", "1280px"];

const theme = {
  breakpoints,
  mediaQueries: {
    small: `@media screen and (min-width: ${breakpoints[0]})`,
    medium: `@media screen and (min-width: ${breakpoints[1]})`,
    large: `@media screen and (min-width: ${breakpoints[2]})`,
  },
  fonts:{
    primary: purple[500],
  },
  colors: {
    primary: purple[500],
    secondary: green[500],
    gray: grey,
    gray500: grey[500],
  },
  config: {
    images: '/images/cp/',
    name: 'Academic app',
  }
};

export default theme;
