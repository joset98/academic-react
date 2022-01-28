import css from "@styled-system/css";
import styled from "styled-components";
import TemplateText from "components/Text";
import { variant } from "styled-system";
import { FormControl as TemplateFormControl } from "@material-ui/core";

export default styled.div`
  ${css({
    display: "flex",
    minHeight: "100vh",
    alignItems: "center",
    label: {
      background: "white",
    },
  })}
`;

export const GridForm = styled.div`
  ${css({
    display: "flex",
    alignItems: "center",
    minHeight: ["100vh"],
    width: ["100%", "100%", "35vw"],
    padding: ["0 1em"],
  })}
`;

export const GridImage = styled.div`
  ${props => css({
    position: "relative",
    display: ["none","none", "flex"],
    alignItems: "center",
    minHeight: ["100vh"],
    width: ["100%", "100%", "75vw"],
    backgroundImage: `url(${props.theme.config.images}login-fondo.jpg)`,
    backgroundSize: "cover",
  })}
`;

export const Overlay = styled.div`
  ${css({
    position: "absolute",
    height: "100%",
    width: "100%",
    background: "#292626",
    top: 0,
    left: 0,
    opacity: 0.7,
  })}
`;

export const Logo = styled.img`
  ${css({
    width: ['150px'],
    mb: ["24px"],
  })}
`;

export const Text = styled(TemplateText)`
  ${(props) =>
    variant({
      prop: "styles",
      variants: {
        welcome: {
          fontSize: ["1.2em"],
          fontWeight: 500,
          color: "#343a40",
          mb: ["8px"],
        },
        welcomeMsg: {
          fontSize: ["0.9rem"],
          fontWeight: 400,
          color: props.theme.colors.gray600,
          mb: ["54px"],
        },
      },
    })}
`;

export const FormControl = styled(TemplateFormControl)`
  ${css({
    marginBottom: ["24px"],
  })}
`;
