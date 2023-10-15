import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import NavegationLevelReducer from "./reducer";

const propTypes = {
  children: PropTypes.node.isRequired,
};

export const InitialState = {
  title: "",
  pages: [
    {
      path: "",
      title: "",
    },
    {
      title: "",
    },
  ],
};

export const NavegationLevelContext = createContext(InitialState);
export const NavegationLevelDispatchContext = createContext(null);

export const NavegationLevelProvider = ({ children }) => {
  const [NavegationData, NavegationDispatch] = useReducer(NavegationLevelReducer, InitialState);

  return (
    <NavegationLevelDispatchContext.Provider value={NavegationDispatch}>
      <NavegationLevelContext.Provider value={NavegationData}>
        {children}
      </NavegationLevelContext.Provider>
    </NavegationLevelDispatchContext.Provider>
  );
};

NavegationLevelProvider.propTypes = propTypes;
