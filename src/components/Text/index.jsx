import React from 'react';
import styled from 'styled-components';
import { color, fontFamily, fontWeight, space } from 'styled-system';

const Template = styled.h1`
  ${color}  
  ${fontFamily}  
  ${fontWeight}
  ${space}
`;

const Text = ({variant,children, ...props}) => <Template as={variant} {...props}>{children}</Template>;

Text.defaultProps = {
  variant: 'p'
};

export default Text;