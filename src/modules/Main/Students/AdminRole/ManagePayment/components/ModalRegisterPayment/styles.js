import styled, { css } from "styled-components";
import {
  Grid as TemplateGrid,
  FormControl as TemplateFormControl,
} from "@material-ui/core";
import { variant } from "styled-system";

export const FormControl = styled(TemplateFormControl)`
  ${css({
    width: ["100%"],
    paddingTop: "8px",
    paddingBottom: "8px",
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
          gridColumn: ['span 7', 'span 4',  'span 4'],
          span: {
            width: '100%',
          }
        },
        div: {
          gridColumn: ['span 5', 'span 8', 'span 8'],
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
        containerBottom: {
          padding: "1em 1.5em",
          div: {
            ':first-child': {
              paddingRight: '0.5rem',
            },
            ':last-child': {
              paddingLeft: '0.5rem',
            }
          }
        },
        containerFormControlLeft: {
          paddingRight: ["0", "0", ".5em"],
        },
        containerFormControlRight: {
          paddingLeft: ["0", "0", ".5em"],
        },
      },
    })}
`;
