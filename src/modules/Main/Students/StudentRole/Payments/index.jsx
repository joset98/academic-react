import React, { useState, useEffect, useContext } from 'react';
import Table from "components/Table";
import { Helmet } from "react-helmet";
import useFetch from "services/useFetch";
import NavigationSection from "shared/NavigationSection";
import { Paper } from "@material-ui/core";
import { AuthDataContext } from 'providers/Auth/provider';
import columns from "./columns";

const Payments = () => {
  const [data, setData] = useState([]);
  const { fetch, loading } = useFetch({ method: "get" });
  // eslint-disable-next-line no-unused-vars
  const dataAuth = useContext(AuthDataContext);

  const getData = async () => {
    console.log(dataAuth);
    const response = await fetch(
      {
        idEstudiante: dataAuth.idUsuario,
      },
      {
        url: "/api/cobros",
      }
    );
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
        <title>Pagos</title>
      </Helmet>
      <Paper>
        <Table
          data={data}
          checkbox={false}
          columns={columns}
          loading={loading}
        />
      </Paper>
    </>
  );
};

export default NavigationSection({
  title: "Pagos",
})(Payments);