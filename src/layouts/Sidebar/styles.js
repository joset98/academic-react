import styled from "styled-components";
import { css } from "@styled-system/css";
import GlobalIcon from '@mui/material/Icon';
import GloabalSkeleton from "@mui/material/Skeleton";

import GlobalText from "components/Text";

export const NavLogo = styled.div`
  ${props => css({
    display: "flex",
    alignItems: "center",
    background: props.theme.colors.sideBar,
    position: "relative",
    padding: ["0px 20px"],
    height: "64px",
    boxShadow: "0 2px 4px rgb(0 0 0 / 8%)",
    img: {
      width: ["30px"],
      marginRight: ["1.4em"],
    },
  })}
`;

export const Text = styled(GlobalText)`
  ${(props) =>
    css({
      fontSize: ["1em"],
      color: "white",
      fontFamily: props.theme.fonts.secondary,
      fontWeight: 600,
    })}
`;

export const StaticSideBar = styled.div`
  ${(props) =>
    css({
      position: "absolute",
      top: "16px",
      right: "-8px",
      button: {
        width: "30px",
        ...(!props.sideBarStatic ? { display: "none" } : {}),
      },
      svg: {
        fill: "#d3d3d3",
        transition: "0.3s transform",
        ...(props.sideBarStatic ? { transform: "rotate(180deg)" } : {}),
      },
    })}
`;

export const Icon = styled(GlobalIcon)`
  ${css({
    marginRight: ['1.1em']
  })}
`;

export const Skeleton = styled(GloabalSkeleton)`
  ${css({
    padding: '10px 0',
    marginLeft: ['16px'],
    width: ['calc(100% - 32px)'],
    height: ['40px']
  })}
`
