/* eslint-disable prettier/prettier */
import PropTypes from "prop-types";

import CreateEditAdminRole from "./AdminRole/CreateEdit";

/** 
 * La ruta principal del módulo al final de arreglo y con la variable "name"
 */
const routes = {
	// PAGOS
	"ADMIN": {
		"ADMINISTRATIVO.COLABORADORES": [

			{ path: "/p/colaboradores/crear", component: CreateEditAdminRole },
			{ path: "/p/colaboradores/editar/:id", component: CreateEditAdminRole },
		],
	},
	"DIRECTOR": {
		"ADMINISTRATIVO.COLABORADORES": [
			{ path: "/p/colaboradores/crear", component: CreateEditAdminRole },
			{ path: "/p/colaboradores/editar/:id", component: CreateEditAdminRole },

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