import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import Container from "./styles";

const TableTop = ({ left, right }) => (
  <Container container justify="space-between" padding={2}>
    <Grid xs={6} item container alignItems="center">
      {left}
    </Grid>
    <Grid item xs={6} container justify="flex-end" alignItems="center">
      {right}
    </Grid>
  </Container>
);

TableTop.propTypes = {
  left: PropTypes.element,
  right: PropTypes.element,
};

TableTop.defaultProps = {
  left: () => null,
  right: () => null,
};

export default TableTop;
