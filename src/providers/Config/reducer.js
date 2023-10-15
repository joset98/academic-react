import { CONFIG_CHANGE_STATIC_SIDEBAR } from "./actions";

function ConfigReducer(state, action) {
  switch (action.type) {
    case CONFIG_CHANGE_STATIC_SIDEBAR:
      return {
        ...state,
        sideBarStatic: !state.sideBarStatic,
      };
    default:
      throw new Error();
  }
}

export default ConfigReducer;
