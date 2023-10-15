import PropTypes from "prop-types";

import EnrollmentAdminRole from "pages/Students/AdminRole/Enrollment";
import PaymentsAdminRole from "pages/Students/AdminRole/Payments";
import ManagePaymentAdminRole from "pages/Students/AdminRole/ManagePayment";
import CreateEditAdminRole from "pages/Students/AdminRole/CreateEdit";
import StudentsAdminRole from "pages/Students/AdminRole/Students";

// import PaymentsAdminRole from "./AdminRole/Payments";
// import ManagePaymentAdminRole from "./AdminRole/ManagePayment";
// import CreateEditAdminRole from "./AdminRole/CreateEdit";
// import StudentsAdminRole from "./AdminRole/Students";

import PaymentsStudentRole from "pages/Students/StudentRole/Payments";
import ManagePaymentStudentRole from "pages/Students/StudentRole/ManagePayment";


// import PaymentsStudentRole from "./StudentRole/Payments";
// import ManagePaymentStudentRole from "./StudentRole/ManagePayment";


/** 
 * La ruta principal del módulo al final de arreglo y con la variable "name"
 */
const routes = {
  // PAGOS
  "ADMIN": {
    "ADMINISTRATIVO.ESTUDIANTES":[
      { path: "/p/estudiantes/matricula/:id", component: EnrollmentAdminRole },
      { path: "/p/estudiantes/pagos/:id", component: PaymentsAdminRole, exact: true },
      { path: "/p/estudiantes/pagos/gestiona/:id", component: ManagePaymentAdminRole },
      { path: "/p/estudiantes/crear", component: CreateEditAdminRole },
      { path: "/p/estudiantes/editar/:id", component: CreateEditAdminRole },
      { path: "/p/estudiantes", component: StudentsAdminRole, exact: true, name: "Estudiantes", icon: "group" },
    ],
  },
  "DIRECTOR":{
    "ADMINISTRATIVO.ESTUDIANTES":[
      { path: "/p/estudiantes/matricula/:id", component: EnrollmentAdminRole },
      { path: "/p/estudiantes/pagos/:id", component: PaymentsAdminRole, exact: true },
      { path: "/p/estudiantes/pagos/gestiona/:id", component: ManagePaymentAdminRole },
      { path: "/p/estudiantes/crear", component: CreateEditAdminRole },
      { path: "/p/estudiantes/editar/:id", component: CreateEditAdminRole },
      { path: "/p/estudiantes", component: StudentsAdminRole, exact: true, name: "Estudiantes", icon: "group" },
    ],
  },
  "ESTUDIANTE":{
    "ESTUDIANTE.PAGOS":[
      { path: "/p/pagos/gestiona/:id", component: ManagePaymentStudentRole},
      { path: "/p/pagos", component: PaymentsStudentRole, name: "Pagos", icon: "payment" },
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