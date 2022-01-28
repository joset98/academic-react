/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Paper, IconButton, Tooltip, Grid, Chip } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import useFetch from "services/useFetch";
import NavigationSection from "shared/NavigationSection";
import Table from "components/Table";
import { AddIcon } from "@material-ui/data-grid";
import Dialog from "components/Dialog";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import CancelIcon from "@material-ui/icons/Cancel";
import { SET_A_PAGE_WITH_INDEX } from "providers/NavegationLevel/actions";
import { NavegationLevelDispatchContext } from "providers/NavegationLevel/provider";
import columns from "./columns";
import ModalRegisterPayment from "./components/ModalRegisterPayment";
import ModalRejectPayment from "./components/ModalReject";
import ModalDetailPayment from "./components/ModalDetailPayment";
import ModalValidatePayment from "./components/ModalValidatePayment";

const ManagePayment = ({ match }) => {
  const { fetch, loading } = useFetch({ method: "get" });
  const [reload, setReload] = useState(false);
  const [reloadStudent, setReloadStudent] = useState(false);
  const [student, setStudent] = useState({});
  const [payment, setPayment] = useState({});
  const [data, setData] = useState([]);
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [openModalReject, setOpenModalReject] = useState({
    isOpen: false,
    data: {},
  });
  const [openModalDetail, setOpenModalDetail] = useState({
    isOpen: false,
    data: {},
  });
  const [openModalValidate, setOpenModalValidate] = useState({
    isOpen: false,
    data: {},
  });
  const [tableColumns, setTableColumns] = useState(columns);
  const dispatchNavegation = useContext(NavegationLevelDispatchContext);

  const reloadData = () => setReload(!reload);

  const getData = async () => {
    const response = await fetch(
      {
        idCobro: match.params.id,
      },
      {
        url: "/api/pagos",
      }
    );
    if (response.status === 200) {
      setData(response.data.pagos);
      setPayment(response.data.cobro);
      setStudent(response.data.estudiante);

      const navegations = [];
      if (student) {
        const { idEstudiante, nombres, apellidos } = response.data.estudiante;
        navegations.push(
          {
            index: "1",
            path: `/p/estudiantes/pagos/${idEstudiante}`,
            title: "Pagos",
          },
          {
            index: "2",
            title: `${nombres.split(" ")} ${apellidos.split(
              " "
            )}`.toLowerCase(),
          }
        );
      }

      setTimeout(() => {
        dispatchNavegation({
          type: SET_A_PAGE_WITH_INDEX,
          payload: {
            pages: navegations,
          },
        });
      }, 100);
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
                  <Tooltip title="Validar pago" aria-label="pagos">
                    <IconButton
                      aria-controls="customized-menu"
                      aria-haspopup="true"
                      variant="success"
                      color="primary"
                      onClick={() =>
                        setOpenModalDetail({ isOpen: true, data: row.original })
                      }
                    >
                      <AssignmentTurnedInIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  {row.original.canal === "AD" && (
                    <Tooltip title="Anular pago" aria-label="delete">
                      <IconButton
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="success"
                        color="primary"
                        disabled={row.original.estado !== "P"}
                        onClick={() =>
                          setOpenModalReject({
                            isOpen: true,
                            data: row.original,
                          })
                        }
                      >
                        <CancelIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
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
        open={openModalDetail.isOpen}
        component={
          <ModalDetailPayment
            reload={reloadData}
            dataPayment={openModalDetail.data}
            handleValidateModal={setOpenModalValidate}
            onClose={() => setOpenModalDetail({ isOpen: false, data: {} })}
          />
        }
        onClose={() => setOpenModalDetail({ isOpen: false, data: {} })}
      />

      <Dialog
        open={openModalReject.isOpen}
        width="450px"
        component={
          <ModalRejectPayment
            reload={reloadData}
            data={openModalReject.data}
            onClose={() => setOpenModalReject({ isOpen: false })}
          />
        }
        onClose={() => setOpenModalReject({ isOpen: false })}
      />

      <Dialog
        open={openModalValidate.isOpen}
        width="450px"
        component={
          <ModalValidatePayment
            reload={reloadData}
            data={openModalValidate.data}
            onCloseDetail={() =>
              setOpenModalDetail({ isOpen: false, data: {} })
            }
            onClose={() => setOpenModalValidate({ isOpen: false })}
          />
        }
        onClose={() => setOpenModalValidate({ isOpen: false })}
      />
    </>
  );
};

export default NavigationSection({
  title: "Pagos Relizados",
  pages: [
    {
      path: "/p/estudiantes",
      title: "Estudiantes",
    },
    {
      path: "/p/estudiantes/pagos/1",
      title: "Pagos",
    },
  ],
})(ManagePayment);
