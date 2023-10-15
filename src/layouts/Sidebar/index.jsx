import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import { withTheme } from "styled-components";
import { Collapse, Hidden, List, ListItem, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

import {
	ConfigContext,
	ConfigDispatchContext,
} from "providers/Config/provider";
import { CONFIG_CHANGE_STATIC_SIDEBAR } from "providers/Config/actions";
import Button from "components/Button";
import Nav, { NavItem } from "components/Nav";
import withRouter from "Hoc/withRouter";
import { NavLogo, StaticSideBar, Text, Icon, Skeleton } from "./styles";


const SubMenuItem = ({ submenu }) => {

	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen( (prevOpen) => !prevOpen);
	};

	const toggleIcon = open ? <ExpandLess /> : <ExpandMore />;

	return (
		<>
			<NavItem to={'#'} activeClassName="active" onClick={handleClick} exact={false}>
				<Icon size="small">{submenu.icon}</Icon>
				{submenu.name}
				{toggleIcon}
			</NavItem>

			<Collapse component="li" in={open} timeout="auto" unmountOnExit>

				<List>
					{
						submenu?.childrens.length &&
						submenu.childrens.map(( childRoute, index) => (
							<li key={`${childRoute.path + index}-`}>
								<NavItem to={childRoute.path} activeClassName="active" exact={false}>
									<Icon size="small">{childRoute.icon}</Icon>
									{childRoute.name}
								</NavItem>
							</li>
						))
					}
				</List>

			</Collapse>
		</>

	)
}

const NavigationList = ({ routeList }) => (
	routeList.map((route, index) => (
		route.path ?
			(
				<NavItem to={route.path} activeClassName="active"
					exact={false} key={`${route + index}-`}
				>
					<Icon size="small">{route.icon}</Icon>
					{route.name}
				</NavItem>
			) :
			(
				<SubMenuItem submenu={route} key={`${route + index}-`} />
			)
	))
)

const Sidebar = ({ theme, routes, loading }) => {
	const config = useContext(ConfigContext);

	const dispatch = useContext(ConfigDispatchContext);

	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<Hidden smDown>

			<Nav variant="fixed" sideBarStatic={config.sideBarStatic}>
				<NavLogo className="d-flex align-items-center">
					<img src={`${theme.config.images}logo-sidebar.png`} alt="Logo" />
					<Text variant="h1">{theme.config.nameSidebar}</Text>
					<StaticSideBar sideBarStatic={config.sideBarStatic}>
						<Button
							className="btn-static-sidebar"
							onClick={() => {
								dispatch({ type: CONFIG_CHANGE_STATIC_SIDEBAR });
							}}
						>
							<DoubleArrowIcon fontSize="small" fill="white" />
						</Button>
					</StaticSideBar>
				</NavLogo>

				{loading && Array(3).fill(3).map((item, index) => (
					<Skeleton variant="text" key={index} />
				))}
				{
					!loading &&
					<NavigationList routeList={routes} />

				}

			</Nav>
		</Hidden>
	);
};

Sidebar.propTypes = {
	theme: PropTypes.object.isRequired,
	routes: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default withRouter(withTheme(Sidebar));
