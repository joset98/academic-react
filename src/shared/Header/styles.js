import styled from "styled-components";
import TemplateAvatar from "@material-ui/core/Avatar";
import css from "@styled-system/css";
import { MenuItem as MenuItemUI } from "@material-ui/core";

export default styled.div`
  ${(props) =>
    css({
      width: [
        '100%',
        '100%',
        `calc(100% - ${
          props.sideBarStatic ? props.theme.config.wsidebar : " 70px"
        })`,
      ],
      background: "white",
      position: "fixed",
      height: "64px",
      top: 0,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 4px rgb(0 0 0 / 8%)",
      p: {
        paddingLeft: ['1em', '1em', "2em"],
      },
      button: {
        paddingRight: ["2em"],
        marginLeft: ["1em"],
      },
      zIndex: 10,
    })}
`;
export const Avatar = styled(TemplateAvatar)`
  ${(props) =>
    css({
      background: `${props.theme.colors.primary}4a`,
      svg: {
        fill: props.theme.colors.primary,
      },
    })}
`;

export const Menu = styled.div`
  ${props => css({
    position: 'absolute',
    top: '64px',
    minHeight: 'calc(100vh - 64px)',
    background:'white',
    width: '100%',
    borderTop: `1px solid ${props.theme.colors.gray200}` ,
  })}
`;

export const Logout = styled.div`
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

export const MenuItem = styled(MenuItemUI)`
  ${props => css({
    whiteSpace: 'normal',
    ':hover': {
      backgroundColor: props.theme.colors.primary,
      p: {
        color: 'white',
      }
    }
  })}
`;
