import React from 'react';
import NavigationSection from 'shared/NavigationSection';
import { Paper, Text } from './styles';

const NotFound = () => (
  <Paper>
    <Text as="h1" styles="title">404</Text>
    <Text styles="subtitle">Página no encontrada</Text>
  </Paper>
);

export default NavigationSection({
  title: "Página no encontrado",
  pages: [],
})(NotFound);