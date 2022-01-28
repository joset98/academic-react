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
        Header: "Tipo de Descuento",
        accessor: "tipoDescuento",
        Cell: ({ row }) => (
          globals.TIPO_DESCUENTO.find((e) => e.value === row.original.tipoDescuento).label
        ),
      },
      {
        Header: "Valor",
        accessor: "valorDescuento",
      },
    ],
  },
];

export default columns;
