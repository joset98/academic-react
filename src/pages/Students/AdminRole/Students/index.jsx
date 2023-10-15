import React, { useEffect, useState } from "react";
import useFetch from "services/useFetch";
import Table from "components/Table";
import NavigationSection from "shared/NavigationSection";
import { Helmet } from "react-helmet";
import { IconButton, Paper, Tooltip } from "@material-ui/core";
import { AddIcon } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import columns from "./columns";

const Students = () => {
  const { fetch, loading } = useFetch({
    uri: "/api/estudiantes",
  });
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await fetch({});
    if (response.status === 200) {
      setData(response.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Estudiantes</title>
      </Helmet>
      <Paper>
        <Table
          columns={columns}
          data={data}
          loading={loading}
          right={(
            <Tooltip title="Agregar" aria-label="add">
              <Link to="/p/estudiantes/crear">
                <IconButton
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="contained"
                  color="primary"
                >
                  <AddIcon />
                </IconButton>
              </Link>
            </Tooltip>
          )}
        />
      </Paper>
    </>
  );
};

export default NavigationSection({
  title: "Estudiantes",
  pages: [
    {
      path: "/p/estudiantes",
      title: "Estudiantes",
    },
  ],
})(Students);
