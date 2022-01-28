/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import Text from "components/Text";
import Table from "components/Table";
import useFetch from "services/useFetch";
import {
  Button, CircularProgress, Divider, Paper,
} from "@material-ui/core";
import columns from "./columns";
import { Grid } from "./styles";

const ModalListConcepts = ({ onClose }) => {
  const [data, setData] = useState([]);
  const { fetch: fetchData, loading: fetchLoading } = useFetch({method: "get"});
  const [selected, setSelected] = useState(null);

  const getData = async () => {
    const response = await fetchData({},{ url: "/api/conceptos" });
    if (response.status === 200) {
      setData(response.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSelected = (e) => {
    setSelected(e.idDescuento);
  };

  return (
    <Paper>
      <Grid container>
        <Grid item xs={12} styles="header">
          <Text variant="h3">Agregar concepto</Text>
        </Grid>
      </Grid>
      <Grid container styles="container" spacing={2}>
        <Grid item xs={12} styles="table">
          <Table
            data={data}
            selectedOne
            checkbox={false}
            columns={columns}
            loading={fetchLoading}
            showTableTop={false}
            handleClickRow={handleSelected}
          />
        </Grid>
      </Grid>
      <Divider />
      <Grid container styles="container" justify="flex-end" spacing={2}>
        <Grid item xs={2}>
          <Button size="large" fullWidth onClick={() => { onClose(); setSelected(null)}}>
            Cancelar
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="secondary"
            disabled={!selected}
          >
            Agregar
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
};

export default ModalListConcepts;
