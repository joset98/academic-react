/* eslint-disable prettier/prettier */
import PropTypes from "prop-types";

import ClassroomsAdminRole from "../Classrooms/AdminRole";
import CollaboratorsAdminRole from "../Collaborators/AdminRole/CollaboratorsList";
import ChargesAdminRole from "../Charges/AdminRole";

/** 
 * La ruta principal del módulo al final de arreglo y con la variable "name"
 */
const routes = {
	// CONFIGURACIONES
	"ADMIN": {
		"ADMINISTRATIVO.ADMINISTRACION": [
			{ 
				name: "Administración", icon: "settings", 
				childrens:[
					
					{ 
						path: "/p/colaboradores", component: CollaboratorsAdminRole, 
						name: "Colaboradores", icon: "supervised_user_circle", exact: true
					},
				    
					{ path: "/p/salones", component: ClassroomsAdminRole, 
						name: "Salones", icon: "home_work", exact: true
					},

					{ 
						path: "/p/cargos", component: ChargesAdminRole, 
						name: "Cargos", icon: "supervised_user_circle", exact: true
					},

				],
			},
		],
	},

	"DIRECTOR": {
		"ADMINISTRATIVO.ADMINISTRACION": [
			{ 
				name: "Administración", icon: "settings", 
				childrens:[
					
					{ 
						path: "/p/colaboradores", component: CollaboratorsAdminRole, 
						name: "Colaboradores", icon: "supervised_user_circle"
					},
				    
					{ path: "/p/salones", component: ClassroomsAdminRole, 
						name: "Salones", icon: "home_work"
					},

					{ 
						path: "/p/cargos", component: ChargesAdminRole, 
						name: "Cargos", icon: "supervised_user_circle"
					},

				],
			},
		],
	}
};

routes.propTypes = {
	path: PropTypes.string,
	component: PropTypes.element,
	exact: PropTypes.bool,
	protected: PropTypes.bool,
	code: PropTypes.number,
};

export default routes;