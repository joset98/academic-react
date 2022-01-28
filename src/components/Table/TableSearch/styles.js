import styled from "styled-components";
import { OutlinedInput as TemplateOutlinedInput } from "@material-ui/core";
import css from "@styled-system/css";

export const OutlinedInput = styled(TemplateOutlinedInput)`
  ${css({
    background: "white",
    borderRadius: "100px",
    input: {
      padding: ["12.5px 14px"],
    },
  })}
`;
