import styled, { css } from "styled-components";
import {
  Grid as TemplateGrid,
  FormControl as TemplateFormControl,
} from "@material-ui/core";
import { variant } from "styled-system";

export const FormControl = styled(TemplateFormControl)`
  ${css({
    width: ["100%"],
  })}
`;

export const Grid = styled(TemplateGrid)`
  ${(props) =>
    variant({
      prop: "styles",
      variants: {
        header: {
          padding: ["16px 1em"],
          background: props.theme.colors.gray300,
        },
        container: {
          padding: "1em 1.5em",
        },
      },
    })}
`;
