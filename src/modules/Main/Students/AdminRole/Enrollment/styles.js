import styled from "styled-components";
import TemplateText from "components/Text";
import { variant } from "styled-system";
import { List as TemplateList, Grid as TemplateGrid } from "@material-ui/core";
import css from "@styled-system/css";

export const Text = styled(TemplateText)`
  ${(props) =>
    variant({
      prop: "styles",
      variants: {
        filters: {
          padding: "16px",
          paddingBottom: "16px",
          fontFamily: props.theme.fonts.secondary,
        },
        student: {
          textTransform: "uppercase",
          padding: "16px",
          paddingBottom: "16px",
          fontSize: ['14px', '14px', '16px'],
          fontFamily: props.theme.fonts.secondary,
        },
      },
    })}
`;

export const List = styled(TemplateList)`
  ${css({
    paddingTop: 0,
  })}
`;

export const Grid = styled(TemplateGrid)`
  ${(props) =>
    variant({
      prop: "styles",
      variants: {
        right: {
          borderLeft: `1px solid #ebedf3`,
        },
        footer: {
          padding: "1em 1em",
          button: {
            mr: ["1em"],
          },
        },
      },
    })}
`;
