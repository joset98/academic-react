import globals from "utils/globals";

const columns = [
  {
    Header: "",
    id: "name",
    isVisible: true,
    hideHeader: true,
    columns: [
      {
        Header: "Descripción",
        accessor: "descripcion",
      },
      {
        Header: "Cant. pagos",
        accessor: "cantidadPagos",
      },
      {
        Header: "Frecuencia",
        accessor: "frecuencia",
        Cell: ({ row }) => (
          globals.FRECUENCIA.find((e) => e.value === row.original.frecuencia).label
        ),
      },
      {
        Header: "Moneda",
        accessor: "moneda",
        Cell: ({ row }) => (
          globals.MONEDA.find((e) => e.value === row.original.moneda).label
        ),
      },
      {
        Header: "Importe",
        accessor: "importe",
      },
    ],
  },
];

export default columns;
