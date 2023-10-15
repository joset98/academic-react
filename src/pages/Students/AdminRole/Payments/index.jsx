/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Paper, IconButton, Tooltip, Grid } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import useFetch from "services/useFetch";
import Table from "components/Table";
import Dialog from "components/Dialog";
import { Link } from "react-router-dom";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import DeleteIcon from "@material-ui/icons/Delete";
import { AddIcon } from "@material-ui/data-grid";
import NavigationSection from "shared/NavigationSection";
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { SET_A_PAGE_WITH_INDEX } from "providers/NavegationLevel/actions";
import { NavegationLevelDispatchContext } from "providers/NavegationLevel/provider";
import columns from "./columns";
import ModalListDiscount from './components/ModalListDiscount';
import ModalListConcepts from './components/ModalListConcepts';
import ModalDeletePayment from './components/ModalDelete';

const Payments = ({ history, match }) => {
  const { fetch, loading } = useFetch({
    method: "get",
  });
  const [studentId, setStudentId] = useState(match.params.id);
  const [student, setStudent] = useState({});
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [openModalDiscount, setOpenModalDiscount] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState({ isOpen: false, data: {} });
  // const [openModalConcepts, setOpenModalConcepts] = useState(false);
  const [allSelected, setAllSelected] = useState([]);
  const [tableColumns, setTableColumns] = useState(columns);
  const dispatchNavegation = useContext(NavegationLevelDispatchContext);
  const { fetch: fetchStudent, loading: loadingStatudent } = useFetch({ loading: !!studentId });

  const reloadData = () => (setReload(!reload));

  const handleSelectItem = (array) => { setAllSelected(array) };

  useEffect(() => {
    const navegations = [];
    if (studentId && student.nombres) {
      const { nombres, apellidos } = student;
      navegations.push({
        index: '1',
        title: (`${nombres.split(' ')} ${apellidos.split(' ')}`).toLowerCase(),
      })
    };
  
    setTimeout(() => {
      dispatchNavegation({
        type: SET_A_PAGE_WITH_INDEX,
        payload: {
          pages: navegations,
        }
      })
    }, 100);
  }, [student]);


  const loadDataStudent = async () => {
    const response = await fetchStudent({}, { url: `/api/estudiantes/${studentId}` })
    if (response.status === 200) {
      setStudent(response.data);
    }
  }

  const getData = async () => {
    const response = await fetch(
      {
        idEstudiante: studentId,
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
    loadDataStudent();
    getData();
  }, [reload]);

  useEffect(() => {
    if (!tableColumns[0].columns.some((e) => e.Header === "")) {
      setTableColumns([{
        ...tableColumns[0],
        columns: [
          ...tableColumns[0].columns,
          {
            Header: "Acciones",
            accessor: "actions",
            Cell: ({ row }) => (
              <Grid container>
                <Link
                  to={`/p/estudiantes/pagos/gestiona/${row.original.idCobro}`}
                >
                  <Tooltip title="Gestionar pagos" aria-label="pagos">
                    <IconButton
                      aria-controls="customized-menu"
                      aria-haspopup="true"
                      variant="success"
                      color="primary"
                    >
                      <LocalAtmIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Tooltip title="Eliminar" aria-label="delete">
                  <IconButton
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="success"
                    color="primary"
                    disabled={!row.original.flgEliminar}
                    onClick={() => setOpenModalDelete({ isOpen: true, data: row.original })}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Grid>
            ),
          },
        ]
      }]);
    }
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
          columns={tableColumns}
          loading={loading}
          getAllSelected={handleSelectItem}
          right={(
            <>
              {allSelected.length > 0 && (
              <Tooltip title="Agregar Descuento" aria-label="add">
                <IconButton
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenModalDiscount(!openModalDiscount)}
                >
                  <LocalOfferIcon />
                </IconButton>
              </Tooltip>
              )}
              {/* ESTO POR AHORA NO VA */}
              {/* <Tooltip title="Agregar Concepto" aria-label="add">
                <IconButton
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenModalConcepts(!openModalConcepts)}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip> */}
            </>
            
          )}
        />
      </Paper>

      <Dialog
        open={openModalDiscount}
        component={(
          <ModalListDiscount
            reload={reloadData}
            selectedItems={allSelected}
            onClose={() => setOpenModalDiscount(!openModalDiscount)}
          />
        )}
        onClose={() => setOpenModalDiscount(!openModalDiscount)}
      />


      <Dialog
        open={openModalDelete.isOpen}
        width="400px"
        component={(
          <ModalDeletePayment
            reload={reloadData}
            data={openModalDelete.data}
            onClose={() => setOpenModalDelete({ isOpen: false })}
          />
        )}
        onClose={() => setOpenModalDelete({ isOpen: false })}
      />

      {/* ESTO POR AHORA NO VA */}
      {/* <Dialog
        open={openModalConcepts}
        component={(
          <ModalListConcepts
            onClose={() => setOpenModalConcepts(!openModalConcepts)}
          />
        )}
        onClose={() => setOpenModalConcepts(!openModalConcepts)}
      /> */}
    </>
  );
};

export default NavigationSection({
  title: "Pagos",
  pages: [
    {
      path: "/p/estudiantes",
      title: "Estudiantes",
    },
  ],
})(Payments);
