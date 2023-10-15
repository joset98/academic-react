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
        Header: "Descripción",
        accessor: "descripcion",
      },
      {
        Header: "Importe",
        accessor: "importeCobro",
      },
      {
        Header: "Vencimiento",
        accessor: "fechaVencimiento",
      },
      {
        Header: "Descuento",
        accessor: "descuento",
        Cell: ({ row }) => {
          if (row.original.descuento) {
            return row.original.descuento.tipoDescuento === 'P'
            ? `${row.original.descuento.valorDescuento}%`
            : `S/ ${row.original.descuento.valorDescuento}`;
          }
          return '0';
        },
      },
      {
        Header: "Penalidad",
        accessor: "importePenalidad",
      },
      {
        Header: "Mora",
        accessor: "importeMora",
      },
      {
        Header: "Pendiente",
        accessor: "importePendiente",
      },
      {
        Header: "Estado",
        accessor: "estado",
        Cell: ({ row }) => (
          <Chip
            size="small"
            color="primary"
            variant="outlined"
            label={globals.ESTADO_COBRO.find((e) => e.value === row.original.estado).label}
          />
        ),
      },
    ],
  },
];

export default columns;
