import styled from "styled-components";
import {
  Grid as TemplateGrid,
} from "@material-ui/core";
import { variant } from "styled-system";

const Grid = styled(TemplateGrid)`
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
          div: {
            ':first-child': {
              paddingRight: '0.5rem',
            },
            ':last-child': {
              paddingLeft: '0.5rem',
            }
          }
        },
        containerCommit: {
          padding: "2em 1.5em",
          p: {
            textAlign: 'center',
          }
        },
      },
    })}
`;

export default Grid;
