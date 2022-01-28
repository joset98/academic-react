/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Chip } from "@material-ui/core";
import globals from "utils/globals";

const columns = [
  {
    Header: "",
    id: "name",
    isVisible: false,
    hideHeader: false,
    columns: [
      {
        Header: "Fecha",
        accessor: "fechaPago",
      },
      {
        Header: "Hora",
        accessor: "horaPago",
      },
      {
        Header: "Medio",
        accessor: "medio",
        Cell: ({ row }) => (
          globals.MEDIO_PAGO_ADMIN.find((e) => e.value === row.original.medio).label
        ),
      },
      {
        Header: "Canal",
        accessor: "canal",
        Cell: ({ row }) => (
          globals.CANAL_PAGO.find((e) => e.value === row.original.canal).label
        ),
      },
      {
        Header: "Referencia",
        accessor: "referencia",
      },
      {
        Header: "Estado",
        accessor: "estado",
        Cell: ({ row }) => (
          <Chip
            size="small"
            color="primary"
            variant="outlined"
            label={globals.ESTADO_PAGO.find((e) => e.value === row.original.estado).label}
          />
        ),
      },
      {
        Header: "Importe",
        accessor: "total",
      },
    ],
  },
];

export default columns;
