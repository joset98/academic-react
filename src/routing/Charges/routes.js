import PropTypes from "prop-types";

import ChargesAdminRole from "pages/Charges/AdminRole";
import CreateEditAdminRole from "pages/Charges/AdminRole/CreateEdit";

/** 
 * La ruta principal del módulo al final de arreglo y con la variable "name"
 */
const routes = {
	"ADMIN": {
		"ADMINISTRATIVO.CARGOS": [
			{ path: "/p/cargos/crear", component: CreateEditAdminRole },
			{ path: "/p/cargos/editar/:id", component: CreateEditAdminRole },
		],
	},
	"DIRECTOR": {
		"ADMINISTRATIVO.CARGOS": [
			{ path: "/p/cargos/crear", component: CreateEditAdminRole },
			{ path: "/p/cargos/editar/:id", component: CreateEditAdminRole },
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
