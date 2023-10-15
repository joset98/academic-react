import React from 'react';
import Template from './styles';

const Button = ({ children, ...props }) => <Template {...props}> {children}</Template>;

export default Button;