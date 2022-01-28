/* eslint-disable no-case-declarations */

import { SNACKBAR_HIDDEN, SNACKBAR_SHOW } from "./actions";

function SnackbarReducer(state, action) {
  switch (action.type) {
    case SNACKBAR_SHOW:
      return { ...state, ...action.payload };
    case SNACKBAR_HIDDEN:
      return {
        severity: "",
        message: null,
      };
    default:
      throw new Error();
  }
}

export default SnackbarReducer;
