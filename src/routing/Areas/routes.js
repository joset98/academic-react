import PropTypes from "prop-types";

import AreasAdminRole from "pages/Areas/AdminRole";

/** 
 * La ruta principal del módulo al final de arreglo y con la variable "name"
 */
const routes = {
  "ADMIN": {
    "1005": [
    { path: "/p/areas", component: AreasAdminRole, name: "Areas", icon: "location_city"}
  ],
  },
  "DIRECTOR":{
    "1005": [
      { path: "/p/areas", component: AreasAdminRole, name: "Areas", icon: "location_city"}
    ],
  },
};

routes.propTypes = {
  path: PropTypes.string,
  component: PropTypes.element,
  exact: PropTypes.bool,
  protected: PropTypes.bool,
  code: PropTypes.number,
};

export default routes;
