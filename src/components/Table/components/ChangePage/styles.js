import styled from "styled-components";
import { IconButton as TemplateIconButton } from "@mui/material";
import css from "@styled-system/css";
import TemplateText from "components/Text";

export const IconButton = styled(TemplateIconButton)`
  ${css({
    svg: {
      fontSize: ["0.6em"],
    },
  })}
`;

export const Text = styled(TemplateText)`
  ${(props) =>
    css({
      fontSize: ["12px"],
      color: props.theme.colors.gray600,
      mr: ["8px"],
    })}
`;
