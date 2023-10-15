import PropTypes from "prop-types";

import PreEnrollmentAdminRole from "pages/PreEnrollments/AdminRole";

/** 
 * La ruta principal del módulo al final de arreglo y con la variable "name"
 */
const routes = {
  "ADMIN": {
    "ADMINISTRATIVO.PREMATRICULA":[
      { path: "/p/prematricula", component: PreEnrollmentAdminRole, name: "Pre-Matrícula", icon: "group" },
    ],
  },
  "DIRECTOR":{
    "ADMINISTRATIVO.PREMATRICULA":[
      { path: "/p/prematricula", component: PreEnrollmentAdminRole, name: "Pre-Matrícula", icon: "group" },
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