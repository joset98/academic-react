// import StudentsRoutes from "./Students/routes";
import PreEnrollmentsRoutes from "./PreEnrollments/routes";
import Collaborators from "./Collaborators/routes";
import Areas from "./Areas/routes"
// import Campaigns from "./Campaigns/routes";
import Courses from "./Courses/routes";
import Classrooms from "./Classrooms/routes";
import Concepts from "./Concepts/routes";
import Programs from "./Programs/routes";
import Charges from "./Charges/routes";
import Admin from "./AdminSection/routes";
// import Discount from "./Discount/routes";
// import Configs from "./Configs/routes";

const routesGenerator = (moduleRoutes) => {
	const routes = {};

	moduleRoutes.forEach((moduleRoute) => {
		Object.keys(moduleRoute).forEach((roleKey) => {
			routes[roleKey] = { ...routes[roleKey], ...moduleRoute[roleKey] };
		})
	})

	return (routes);
}

export default routesGenerator([
	// StudentsRoutes,
	PreEnrollmentsRoutes,
	Classrooms,
	Admin,
	Collaborators,
	Charges,
	Concepts,
	Programs,
	// Discount,
	//Areas,
	//Campaigns,
	//Courses,
]);
