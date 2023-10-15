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
        "header__container": {
          top: '0',
          left: '0',
          zIndex: '10',
          position: 'sticky',
        },
        header: {
          padding: ["16px 1em"],
          borderRadius: "4px 4px 0 0",
          background: props.theme.colors.gray300,
        },
        subtitle: {
          padding: ["10px 1em"],
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
        },
        container: {
          alignItems: 'center',
          padding: "1em 1.5em",
          height: 'fit-content',
        },
        containerButtom: {
          alignItems: 'center',
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
        containerImg: {
          padding: ["2rem 1.5em 1em", "2rem 1.5em 1em 0"],
          justifyContent: 'center',
          alignItems: 'center',
          img: {
            width: '100%',
            height: '300px',
            objectFit: 'contain',
          },
          h5: {
            textAlign: 'right',
            cursor: 'pointer',
            paddingTop: '5px',
            textDecoration: 'underline',
            ':hover': {
              opacity: '.8',
            }
          }
        },
      },
    })}
`;
