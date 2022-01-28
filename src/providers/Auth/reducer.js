/* eslint-disable no-case-declarations */
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_UPDATE } from "./actions";

function AuthReducer(state, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return { ...state, ...action.payload };
    case AUTH_LOGOUT:
      return {};
    case AUTH_UPDATE:
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
}

export default AuthReducer;
