import PropTypes from "prop-types";

import PreEnrollmentAdminRole from "pages/PreEnrollments/AdminRole";

import ProgramAdminRole from "pages/Programs/AdminRole";
import CreateEditAdminRole from "pages/Programs/AdminRole/CreateEdit";
import showConceptsAdminRole from "pages/Programs/AdminRole/ShowConcepts";

/** 
 * La ruta principal del módulo al final de arreglo y con la variable "name"
 */
const routes = {
	"ADMIN": {
		"ADMINISTRATIVO.CURSOS": [
			{ path: "/p/programas/crear", component: CreateEditAdminRole },
			{ path: "/p/programas/:id/conceptos", component: showConceptsAdminRole },
			{ path: "/p/programas/editar/:id", component: CreateEditAdminRole },
			{ 
				path: "/p/programas", component: ProgramAdminRole, 
				name: "Programas", icon: "paid"
			}
		],
	},
	"DIRECTOR": {
		"ADMINISTRATIVO.CURSOS": [
			{ path: "/p/programas/crear", component: CreateEditAdminRole },
			{ path: "/p/programas/:id/conceptos", component: showConceptsAdminRole },
			{ path: "/p/programas/editar/:id", component: CreateEditAdminRole },
			{ 
				path: "/p/programas", component: ProgramAdminRole, 
				name: "Programas", icon: "paid"
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
