import PropTypes from "prop-types";
import Auth from "modules/Auth";
import Landing from "modules/Landing";
import Main from "modules/Main";
import NotFound from "shared/NotFound";

const routes = [
  { path: "/p", component: Main },
  { path: "/auth", component: Auth },
  { path: "**", component: NotFound },
  { path: "", component: Landing, exact: true },
];

routes.propTypes = {
  path: PropTypes.string,
  component: PropTypes.element,
  exact: PropTypes.bool,
  protected: PropTypes.bool,
};

export default routes;
