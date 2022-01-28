/* eslint-disable prettier/prettier */
import PropTypes from "prop-types";

import AcademicService from "./AcademicService";

/** 
 * La ruta principal del módulo al final de arreglo y con la variable "name"
 */
const routes = {
	// CONFIGURACIONES
	"ADMIN": {
		"ADMINISTRATIVO.AREAS": [
			{ 
				name: "Configuraciones", icon: "school", 
				childrens:[
					{
						path: "/p/configuraciones/servicio-academico", component: AcademicService, 
						exact: true, name: "Servicios Academicos", icon: "school", 
					},
					{
						path: "/p/configuraciones/admin", component: AcademicService, 
						exact: true, name: "Administrativo", icon: "school", 
					}
				],
			},
		],
	},

	"DIRECTOR": {
		"ADMINISTRATIVO.CONFIGURACIONES": [
			{ 
				path: "/p/configuraciones", component: AcademicService, exact: true, 
				name: "Servicios academico", icon: "school" 
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