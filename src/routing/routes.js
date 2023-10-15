import PropTypes from "prop-types";
import Auth from "pages/Auth";
import Main from "pages";
import NotFound from "layouts/NotFound";
// import Landing from "pages/Landing";

const routes = [
  { path: "/p", component: Main },
  { path: "/auth", component: Auth },
  { path: "**", component: NotFound },
  // { path: "", component: Landing, exact: true },
];

routes.propTypes = {
  path: PropTypes.string,
  component: PropTypes.element,
  exact: PropTypes.bool,
  protected: PropTypes.bool,
};

export default routes;
