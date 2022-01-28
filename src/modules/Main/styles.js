import styled from "styled-components";
import css from "@styled-system/css";
import { Paper } from "@material-ui/core";

export const Content = styled.div`
  ${(props) =>
    css({
      position: "relative",
      margin: 0,
      minHeight: "calc(100vh - 64px)",
      width: "100%",
      marginTop: "64px",
      paddingBottom: '25px',
      paddingLeft: [
        "0",
        "0",
        `${props.sideBarStatic ? props.theme.config.wsidebar : "70px"}`,
      ],
    })}
`;

export const Loading = styled(Paper)`
  ${css({
    display: "flex",
    minHeight: '70vh',
    alignItems: "center",
    justifyContent: "center",
    marginTop: ['calc(64px + 62px)'],
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
  })}
`

export default styled.div`
  ${(props) =>
    css({
      display: "flex",
      position: "relative",
      background: props.theme.colors.bodyBg,
    })}

  ::before {
    content: "";
    display: inline-block;
    display: block;
    position: absolute;
    width: 100%;
    height: 234px;
    background: ${(props) => props.theme.colors.primary};
    top: 0;
    left: 0;
  }
`;
