import React, { useContext, useEffect, useState } from "react";
import { Routes, useNavigate , Route,   BrowserRouter as Router, } from "react-router-dom";
import {
	CircularProgress,
	Container as ContainerContent,
} from "@mui/material";

import useFetch from "hooks/useFetch";
import { ConfigContext } from "providers/Config/provider";
import { AuthDataContext } from "providers/Auth/provider";

import Header from "layouts/Header";
import Sidebar from "layouts/Sidebar";
import Snackbar from "layouts/Snackbar";
import RouterOutlet from "layouts/RouterOutlet";
import {appRoutes as MainRoutes} from "routing";
import Container, { Content, Loading } from "./styles";
import sortingRoutes from "utils/sortRoutes";

const Layout = () => {
	const { fetch } = useFetch({ method: "post" });
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [menuRoutes, setMenuRoutes] = useState([]);
	const [activesRoutes, setActivesRoutes] = useState([]); // Rutas a renderizar
	const { role, menus, modulos } = useContext(AuthDataContext);
	const [initialRoute, setInitialRoute] = useState(null);
	const config = useContext(ConfigContext);
	console.log({ role, menus, modulos })
	const getMenu = () => {
		// Módulos activos por el usuario
		// Organizar de acuerdo a la foto
		console.log({menus})
		const activesModules = sortingRoutes(menus);
		// const activesModules = menus;

		const routesByRole = MainRoutes[role];
		let newActivesRoutes = [];
		let newMenuRoutes = [];

		console.group('routes');
		console.log({activesModules});
		console.log({routesByRole});
		console.groupEnd();

		activesModules.forEach((route, index) => {
			if (routesByRole[route]) {

				const childrens = getChildRoutes(routesByRole[route]);
				newActivesRoutes = newActivesRoutes.concat(childrens);
				newActivesRoutes = newActivesRoutes.concat(routesByRole[route]);

				newMenuRoutes = routesByRole[route][routesByRole[route].length - 1].icon ?
					newMenuRoutes.concat(
						routesByRole[route][routesByRole[route].length - 1]
					) :
					newMenuRoutes;

				if (index === 0) {
					setInitialRoute(
						routesByRole[route][routesByRole[route].length - 1]
							.path
					);
				}
			}
		});

		setActivesRoutes(newActivesRoutes);
		setMenuRoutes(newMenuRoutes);

		setTimeout(() => {
			setLoading(false);
		}, 0);
	};

	const getChildRoutes = (parentMenu) => {

		return parentMenu.filter(menu => menu.childrens).map(menu => menu.childrens).flat();
	}

	useEffect(() => {
		if (initialRoute) navigate(initialRoute);
	}, [activesRoutes]);

	useEffect(() => {
		getMenu();
	}, []);

	console.log({newMenuRoutes: activesRoutes})

	return (
		<>
			{typeof document !== "undefined" && (
				<Container>
					{/* <Sidebar routes={menuRoutes} loading={loading} /> */}
					<Content sideBarStatic={config.sideBarStatic}>
						{/* <Header routes={menuRoutes} loading={loading} /> */}
						<ContainerContent>
							{loading ? (
								<Loading>
									<CircularProgress size={40} />
								</Loading>
							) : (
								<Routes>
									{/* {activesRoutes.filter(route => route.path).map((route) => (
										<RouterOutlet key={route.path} {...route} />
									))} */}
									{activesRoutes.filter((route) => (
										<Route path={route.path} element={<route.component/>} key={route.path} {...route} />
									))}


								</Routes>
							)}
						</ContainerContent>
					</Content>
					<Snackbar />
				</Container>
			)}
		</>
	);
};

export default Layout;
