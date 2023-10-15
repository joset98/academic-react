import PropTypes from "prop-types";
import CoursesAdminRole from "pages/Courses/AdminRole";

/** 
 * La ruta principal del módulo al final de arreglo y con la variable "name"
 */
const routes = {
  "ADMIN": {
    "1004": [
      { path: "/p/cursos", component: CoursesAdminRole, name: "Cursos", icon: "class"}
    ],
  },
  "DIRECTOR":{
    "1004": [
      { path: "/p/cursos", component: CoursesAdminRole, name: "Cursos", icon: "class"}
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
