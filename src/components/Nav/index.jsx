import React from "react";
import PropTypes from 'prop-types';
import Template, { NavItem as NavItemTemplate } from "./styles";

const Nav = ({ children, ...props }) => (
  <Template {...props}>{children}</Template>
);
const NavItem = (props) => <NavItemTemplate {...props} />;

Nav.propTypes = {
  children: PropTypes.node.isRequired,
}

export { NavItem };
export default Nav;
