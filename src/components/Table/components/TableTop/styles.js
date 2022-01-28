import styled, { css } from "styled-components";
import { Grid } from "@material-ui/core";

export default styled(Grid)`
  ${(props) =>
    css({
      padding: ["16px 1em"],
      background: props.theme.colors.gray300,
    })}
`;
