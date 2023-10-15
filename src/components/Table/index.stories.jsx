import React from "react";
import Table from "./index";
import makeData from "./makeData";

const stories = {
  component: Table,
  title: "Components/Table",
};

const columns = [
  {
    Header: "",
    id: "name",
    isVisible: false,
    hideHeader: false,
    columns: [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Edad",
        accessor: "age",
      },
    ],
  },
];

export const Default = () => <Table columns={columns} data={makeData(42)} />;

export default stories;
