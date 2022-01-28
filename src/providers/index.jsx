import React from "react";
import { AuthProvider } from "./Auth/provider";
import { ConfigProvider } from "./Config/provider";
import { SnackbarProvider } from "./Snackbar/provider";
import { NavegationLevelProvider } from "./NavegationLevel/provider";

const CONTEXTS = [AuthProvider, ConfigProvider, SnackbarProvider, NavegationLevelProvider];

const Providers = (props) => {
  const { children, ...rest } = props;

  return CONTEXTS.reduceRight(
    (acc, Comp) => <Comp {...rest}>{acc}</Comp>,
    children
  );
};

export default Providers;
