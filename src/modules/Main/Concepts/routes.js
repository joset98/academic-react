/* eslint-disable prettier/prettier */
import PropTypes from "prop-types";
import ConceptAdminRole from "./AdminRole";
import CreateEditAdminRole from "./AdminRole/CreateEdit";

/** 
 * La ruta principal del módulo al final de arreglo y con la variable "name"
 */
const routes = {
	"ADMIN": {
		"ADMINISTRATIVO.CONCEPTOS": [
			{ path: "/p/conceptos/crear", component: CreateEditAdminRole },
			{ path: "/p/conceptos/editar/:id", component: CreateEditAdminRole },
			{ 
				path: "/p/conceptos", component: ConceptAdminRole, 
				name: "Conceptos", icon: "paid"
			}
		],
	},
	"DIRECTOR": {
		"ADMINISTRATIVO.CONCEPTOS": [
			{ path: "/p/conceptos/crear", component: CreateEditAdminRole },
			{ path: "/p/conceptos/editar/:id", component: CreateEditAdminRole },
			{ 
				path: "/p/conceptos", component: ConceptAdminRole, 
				name: "Conceptos", icon: "paid"
			}
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
