/* eslint-disable prettier/prettier */
import PropTypes from "prop-types";
import ClassroomsAdminRole from "./AdminRole";
import CreateEditAdminRole from "./AdminRole/CreateEdit";

/** 
 * La ruta principal del módulo al final de arreglo y con la variable "name"
 */
const routes = {
	"ADMIN": {
		"ADMINISTRATIVO.SALONES": [
			{ path: "/p/salones/editar/:id", component: CreateEditAdminRole },
			{ path: "/p/salones/crear", component: CreateEditAdminRole },
		],
	},
	"DIRECTOR": {
		"ADMINISTRATIVO.SALONES": [
			{ path: "/p/salones/editar/:id", component: CreateEditAdminRole },
			{ path: "/p/salones/crear", component: CreateEditAdminRole },
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
