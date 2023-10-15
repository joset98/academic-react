import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import ConfigReducer from "./reducer";

const propTypes = {
  children: PropTypes.node.isRequired,
};

export const InitialState = {
  sideBarStatic: false,
};

export const ConfigContext = createContext(InitialState);
export const ConfigDispatchContext = createContext(null);

export const ConfigProvider = ({ children }) => {
  const [ConfigData, ConfigDispatch] = useReducer(ConfigReducer, InitialState);
  return (
    <ConfigDispatchContext.Provider value={ConfigDispatch}>
      <ConfigContext.Provider value={ConfigData}>
        {children}
      </ConfigContext.Provider>
    </ConfigDispatchContext.Provider>
  );
};

ConfigProvider.propTypes = propTypes;
