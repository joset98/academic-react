import React from "react";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { Create } from "@material-ui/icons";
import { Link } from "react-router-dom";

const columns = [
  {
    Header: "",
    id: "name",
    isVisible: false,
    hideHeader: false,
    columns: [
      {
        Header: "Nivel",
        accessor: "nivel",
      },
      {
        Header: "Grado",
        accessor: "grado",
      },
      {
        Header: "Sección",
        accessor: "seccion",
      },
      {
        Header: "Total Vacantes",
        accessor: "vacantes",
      },
      {
        Header: "Vacantes disponibles",
        accessor: "vacantesDisponibles",
      },
    ],
  },
];

export default columns;
