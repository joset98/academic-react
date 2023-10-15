import styled from "styled-components";
import {
  Card as CardTemplate,
  Container as ContainerTemplate,
} from "@mui/material";

import css from "@styled-system/css";

export const Container = styled.div`
  ${(props) =>
    css({
      left: 0,
      width: "100%",
      top: "0",
      paddingLeft: 0,
      margin: ["32px 0"],
      // background: props.theme.colors.primary,
    })}
`;
export const ContainerBreadcrumb = styled(ContainerTemplate)`
  ${css({
    paddingLeft: [0],
    paddingRight: [0],
  })}
`;

export const Breadcrumb = styled.ul`
  ${css({
    listStyle: "none",
    display: "flex",
  })}
`;

export const BreadcrumbItem = styled.li`
  ${(props) =>
    css({
      display: 'flex',
      textTransform: 'capitalize',
      a: {
        color: props.theme.colors.gray,
      },
      span: {
        margin: ["0 0.5em"],
        color: props.theme.colors.gray,
      }
    })}
`;

export const Title = styled.h3`
  ${css({
    fontSize: ["1.7em"],
    paddingBottom: '12px',
    fontWeight: 600,
    color: "white",
  })}
`;
