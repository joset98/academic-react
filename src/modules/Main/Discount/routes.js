/* eslint-disable prettier/prettier */
import PropTypes from "prop-types";
import DiscountAdminRole from "./AdminRole";
import CreateEditAdminRole from "./AdminRole/CreateEdit";

/** 
 * La ruta principal del módulo al final de arreglo y con la variable "name"
 */
const routes = {
	"ADMIN": {
		"ADMINISTRATIVO.DESCUENTOS": [
			{ path: "/p/descuentos/crear", component: CreateEditAdminRole },
			{ path: "/p/descuentos/editar/:id", component: CreateEditAdminRole },
			{ 
				path: "/p/descuentos", component: DiscountAdminRole, 
				name: "Descuentos", icon: "paid"
			}
		],
	},
	"DIRECTOR": {
		"ADMINISTRATIVO.DESCUENTOS": [
			{ path: "/p/descuentos/crear", component: CreateEditAdminRole },
			{ path: "/p/descuentos/editar/:id", component: CreateEditAdminRole },
			{ 
				path: "/p/descuentos", component: DiscountAdminRole, 
				name: "Descuentos", icon: "paid"
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
