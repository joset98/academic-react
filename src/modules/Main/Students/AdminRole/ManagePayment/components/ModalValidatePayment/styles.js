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
  ${variant({
    prop: "styles",
    variants: {
      inputFile: {
        display: 'grid',
        alignItems: 'center',
        flexDirection: 'row',
        gridGap: '10px',
        gridTemplateColumns: 'repeat(12, 1fr)',
        label: {
          gridColumn: 'span 4',
          span: {
            width: '100%',
          }
        },
        div: {
          gridColumn: 'span 8',
          input: {
            cursor: 'auto',
          }
        }
      }
    },
  })}
`;

export const Grid = styled(TemplateGrid)`
  ${(props) =>
    variant({
      prop: "styles",
      variants: {
        header: {
          padding: ["16px 1em"],
          borderRadius: "4px 4px 0 0",
          background: props.theme.colors.gray300,
        },
        container: {
          padding: "1em 1.5em",
        },
        containerCommit: {
          padding: "2em 1.5em",
        },
      },
    })}
`;
