import styled from "styled-components";
import TemplateText from "components/Text";
import css from "@styled-system/css";
import { Select as TemplateSelect } from "@mui/material";

export const Text = styled(TemplateText)`
  ${(props) =>
    css({
      fontSize: ["12px"],
      color: props.theme.colors.gray600,
      mr: ["8px"],
    })}
`;

export const Select = styled(TemplateSelect)`
  ${(props) =>
    css({
      fontSize: ["12px"],
      color: props.theme.colors.gray600,
      mr: ["8px"],
    })}
`;
