import styled from "styled-components";
import { NavLink } from "react-router-dom";
import css from "@styled-system/css";
import { variant } from "styled-system";

export default styled.div`
  ${(props) =>
    css({
      height: "100vh",
      width: props.sideBarStatic ? props.theme.config.wsidebar : "70px",
      background: props.theme.colors.sideBar,
      overflowX: "hidden",
      transition: "0.4s width",
      zIndex: 11,
      ":hover": {
        width: props.theme.config.wsidebar,
      },
      ...(!props.sideBarStatic
        ? {
            ":hover .btn-static-sidebar": {
              display: "block",
            },
          }
        : {}),
    })}
  ${variant({
    variants: {
      fixed: {
        position: "fixed",
      },
    },
  })}
`;

export const NavItem = styled(NavLink)`
  ${(props) =>
    css({
      display: "flex",
      alignItems: "center",
      color: "#8590a5",
      padding: ["4px 20px"],
      height: ["48px"],
      fontSize: ["15px"],
      textDecoration: "none",
      fontFamily: props.theme.colors.secondary,
      ":hover, &.active": {
        color: props.theme.colors.sideBarActiveColor,
        textDecoration: "none",
        background: props.theme.colors.sideBarActive,
      },
      svg: {
        marginRight: ["1.2em"],
      },
    })}
`;
