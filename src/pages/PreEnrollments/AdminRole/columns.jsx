/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { Create } from "@mui/icons-material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MoneyIcon from "@mui/icons-material/Money";

const columns = [
  {
    Header: "",
    id: "name",
    isVisible: false,
    hideHeader: false,
    columns: [
      {
        Header: "Nombres",
        accessor: "nombres",
      },
      {
        Header: "Apellidos",
        accessor: "apellidos",
      },
      {
        Header: "Código",
        accessor: "codigoEstudiante",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Télefono",
        accessor: "telefono",
      },
      {
        Header: "Colegio de procedencia",
        accessor: "colegioProcedencia",
      },
      {
        Header: "Acciones",
        accessor: "action",
        Cell: ({ row }) => (
          <Grid container>
            <Link
              to={`/p/estudiantes/matricula/${row.original.idPreMatricula}`}
            >
              <Tooltip title="Matricula" aria-label="matricula">
                <IconButton
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="success"
                  color={row.original.idSalon ? "primary" : "secondary"}
                >
                  <ListAltIcon fontSize="small" color="primary"/>
                </IconButton>
              </Tooltip>
            </Link>
            <Link to={`/p/estudiantes/pagos/${row.original.idPreMatricula}`}>
              <Tooltip title="Pagos" aria-label="pagos">
                <IconButton
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="success"
                  color="primary"
                >
                  <MoneyIcon fontSize="small" color="primary"/>
                </IconButton>
              </Tooltip>
            </Link>
            <Link to={`/p/estudiantes/editar/${row.original.idPreMatricula}`}>
              <Tooltip title="Editar" aria-label="edit">
                <IconButton
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="contained"
                  color="primary"
                >
                  <Create fontSize="small" />
                </IconButton>
              </Tooltip>
            </Link>
          </Grid>
        ),
      },
    ],
  },
];

export default columns;
