import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { IconButton, Paper, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// import { AddIcon } from "@material-ui/data-grid";

import useFetch from "hooks/useFetch";
import NavigationSection from "layouts/NavigationSection";
import Table from "components/Table";
import columns from "./columns";

const PreEnrollments = () => {
  const { fetch, loading } = useFetch({
    uri: "/api/pre-matricula",
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
        <title>Pre-Matrícula</title>
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
  title: "Pre-Matrícula",
  pages: [
    {
      path: "/p/prematricula",
      title: "Pre-Matrícula",
    },
  ],
})(PreEnrollments);
