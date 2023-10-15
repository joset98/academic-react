import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import SnackbarReducer from "./reducer";

const propTypes = {
  children: PropTypes.node.isRequired,
};

export const InitialState = {
  severity: "default",
  message: null,
};

export const SnackbarContext = createContext(InitialState);
export const SnackbarDispatchContext = createContext(null);

export const SnackbarProvider = ({ children }) => {
  const [SnackbarData, SnackbarDispatch] = useReducer(
    SnackbarReducer,
    InitialState
  );
  return (
    <SnackbarDispatchContext.Provider value={SnackbarDispatch}>
      <SnackbarContext.Provider value={SnackbarData}>
        {children}
      </SnackbarContext.Provider>
    </SnackbarDispatchContext.Provider>
  );
};

SnackbarProvider.propTypes = propTypes;
