import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Table from "components/Table";
import useFetch from "services/useFetch";
import PropTypes from "prop-types";
import NavigationSection from "shared/NavigationSection";
import { Paper, IconButton, Tooltip, Grid, Chip } from "@material-ui/core";
import Dialog from "components/Dialog";
import { AddIcon } from "@material-ui/data-grid";
import DescriptionIcon from "@material-ui/icons/Description";
import columns from "./columns";
import ModalRegisterPayment from "./components/ModalRegisterPayment";
import ModalValidatePayment from "./components/ModalValidatePayment";

const ManagePayment = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [payment, setPayment] = useState({});
  const { fetch, loading } = useFetch({ method: "get" });
  const [tableColumns, setTableColumns] = useState(columns);
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [openModalValidate, setOpenModalValidate] = useState({
    isOpen: false,
    data: {},
  });

  const reloadData = () => setReload(!reload);

  const getData = async () => {
    const response = await fetch(
      {
        idCobro: id,
      },
      {
        url: "/api/pagos",
      }
    );
    if (response.status === 200) {
      setData(response.data.pagos);
      setPayment(response.data.cobro);
    }
  };

  useEffect(() => {
    getData();
  }, [reload]);

  useEffect(() => {
    if (!tableColumns[0].columns.some((e) => e.Header === "Acciones")) {
      setTableColumns([
        {
          ...tableColumns[0],
          columns: [
            ...tableColumns[0].columns,
            {
              Header: "Acciones",
              accessor: "actions",
              Cell: ({ row }) => (
                <Grid container>
                  <Tooltip title="Ver detalle de pago" aria-label="pagos">
                    <IconButton
                      aria-controls="customized-menu"
                      aria-haspopup="true"
                      variant="success"
                      color="primary"
                      onClick={() =>
                        setOpenModalValidate({
                          isOpen: true,
                          data: row.original,
                        })
                      }
                    >
                      <DescriptionIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Grid>
              ),
            },
          ],
        },
      ]);
    }
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pagos Relizados</title>
      </Helmet>
      <Paper>
        <Table
          columns={tableColumns}
          data={data}
          loading={loading}
          checkbox={false}
          search={false}
          left={
            payment.importePendiente ? (
              <Chip
                label={`Pendiente: ${payment.importePendiente}`}
                color="primary"
                variant="outlined"
              />
            ) : null
          }
          right={
            payment.importePendiente != 0 ? (
              <Tooltip title="Registrar pago" aria-label="add">
                <IconButton
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenModalRegister(!openModalRegister)}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            ) : null
          }
        />
      </Paper>

      <Dialog
        open={openModalRegister}
        component={
          <ModalRegisterPayment
            reload={reloadData}
            paymentImport={payment.importePendiente}
            onClose={() => setOpenModalRegister(!openModalRegister)}
          />
        }
        onClose={() => setOpenModalRegister(!openModalRegister)}
      />

      <Dialog
        open={openModalValidate.isOpen}
        component={
          <ModalValidatePayment
            reload={reloadData}
            dataPayment={openModalValidate.data}
            onClose={() => setOpenModalValidate({ isOpen: false, data: {} })}
          />
        }
        onClose={() => setOpenModalValidate({ isOpen: false, data: {} })}
      />
    </>
  );
};

ManagePayment.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
  row: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default NavigationSection({
  title: "Pagos Relizados",
  pages: [
    {
      path: "/p/pagos",
      title: "Pagos",
    },
  ],
})(ManagePayment);
