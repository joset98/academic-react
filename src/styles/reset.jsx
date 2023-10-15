import { css } from "styled-components";

const reset = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  li,
  div,
  header,
  nav,
  section,
  article,
  aside,
  footer,
  figure {
    margin: 0;
    padding: 0;
    vertical-align: baseline;
    border: 0;
  }

  .switch-wrapper {
    position: relative;
    width: 100%;
  }

  .switch-wrapper > div {
    position: absolute;
    width: 100%;
  }
`;

export default reset;
