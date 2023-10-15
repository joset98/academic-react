import { SET_NAVEGATION, REMOVE_NAVEGATION, SET_A_PAGE_WITH_INDEX } from "./actions";

function NavegationLevelReducer(state, action) {
  switch (action.type) {
    case SET_NAVEGATION:
      return {
        ...action.payload 
      };
  
    case SET_A_PAGE_WITH_INDEX:
      const { pages, title } = action.payload;
      const nextPages = state.pages;
      if (pages) {
        pages.forEach((page) => {
          const { index, path, title: titlePath } = page;
          nextPages[index] = {
            path,
            title: titlePath,
          };
        });
      }
      return {
        title: title || state.title,
        pages: [
          ...nextPages
        ],
      };
  
    case REMOVE_NAVEGATION:
      return {
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
    default:
      throw new Error();
  }
}

export default NavegationLevelReducer;
