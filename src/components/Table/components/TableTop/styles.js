import styled, { css } from "styled-components";
import { Grid } from "@mui/material";

export default styled(Grid)`
  ${(props) =>
    css({
      padding: ["16px 1em"],
      background: props.theme.colors.gray300,
    })}
`;
