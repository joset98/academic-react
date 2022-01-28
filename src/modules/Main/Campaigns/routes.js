/* eslint-disable prettier/prettier */
import PropTypes from "prop-types";
import CampaignsAdminRole from "./AdminRole";


/** 
 * La ruta principal del módulo al final de arreglo y con la variable "name"
 */
const routes = {
  "ADMIN": {
    "1006": [
      { path: "/p/campannas", component: CampaignsAdminRole, name: "Campañas", icon: "send"}
    ],
  },
  "DIRECTOR":{
    "1006": [
      { path: "/p/campannas", component: CampaignsAdminRole, name: "Campañas", icon: "send"}
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
