/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useContext, useMemo } from 'react';
import Text from "components/Text";
import Table from "components/Table";
import useFetch from "services/useFetch";
import {
  Button, CircularProgress, Divider, Paper,
} from "@material-ui/core";
import { SnackbarDispatchContext } from "providers/Snackbar/provider";
import { SNACKBAR_SHOW } from "providers/Snackbar/actions";
import columns from "./columns";
import { Grid } from "./styles";

const ModalListDiscount = ({ onClose, selectedItems, reload }) => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modeEdit, setModeEdit] = useState(false);
  const [infoToShow, setInfoToShow] = useState('');
  const dispatch = useContext(SnackbarDispatchContext);
  const { fetch: fetchData, loading: fetchLoading } = useFetch({method: "get"});
  const { fetch: fetchRegister, loading: fetchLoadingRegister } = useFetch({method: "put"});

  const handleSelected = (e) => { setSelected(e.idDescuento) };

  const handleModeisEdit = () => {
    const itIsASelected = selectedItems.length === 1;
    const hasDiscount = selectedItems.some((e) => e.descuento);
    if (itIsASelected && hasDiscount) {
      setModeEdit(true);
      const nextData = data.filter(e => e.idDescuento === selectedItems[0].descuento.idDescuento);
    } else {
      setModeEdit(false);
    }
  };

  const handleContentModal = () => {
    if (selectedItems.length > 1 && selectedItems.every((e) => e.descuento)) {
      setInfoToShow('2');
    } else if (selectedItems.length > 1 && selectedItems.some((e) => e.descuento)) {
      setInfoToShow('1');
    } else {
      setInfoToShow('');
    }
  };

  useEffect(() => {
    handleContentModal();
    handleModeisEdit();
  }, [selectedItems]);

  const getData = async () => {
    const response = await fetchData({},{ url: "/api/descuentos" });
    if (response.status === 200) {
      setData(response.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const registerDiscount = async (idCobro) => {
    const dataToSend = {
      idCobro, descuento: modeEdit ? null : { idDescuento: selected },
    };
    const response = await fetchRegister(dataToSend, { url: "/api/cobros" });
    return response;
  };

  const handleAllRegister = async () => {
    if(!fetchLoadingRegister) {
      await await Promise.all(
        selectedItems.map((e) => registerDiscount(e.idCobro))
      ).then(res => {
        if(res.every((e) => e.status === 200)) {
          reload();
          dispatch({
            type: SNACKBAR_SHOW,
            payload: {
              severity: "success",
              message: modeEdit ? (
                "Se quitó el descuento correctamente"
              ) : (
                "Descuento aplicado correctamente"
              ),
            },
          });
          onClose();
        }
      });
    }
  };

  const TableMemo = useMemo(
    () => (
      <Table
        data={modeEdit && selectedItems[0] && selectedItems[0].descuento ? (
          data.filter(e => e.idDescuento === selectedItems[0].descuento.idDescuento)
        ) : (
          data
        )}
        selectedOne
        checkbox={false}
        columns={columns}
        loading={fetchLoading}
        showTableTop={false}
        autoResetSelectedRows={false}
        selectDefault={modeEdit ? "0" : null}
        handleClickRow={handleSelected}
      />
    ),
    [data, selectedItems, fetchLoading, modeEdit]
  );

  return (
    <Paper>
      <Grid container>
        <Grid item xs={12} styles="header">
          {infoToShow ? (
            <Text variant="h3">Notificación</Text>
          ):(
            <Text variant="h3">Agregar descuento</Text>
          )}
        </Grid>
      </Grid>
      <Grid container styles="container" spacing={2}>
        <Grid item xs={12} styles="table">
          {(() => {
            switch(infoToShow) {
              case '1':
                return (
                  <>
                    Uno de los conceptos seleccionados ya posee un descuento aplicado,
                    por favor, seleccione conceptos disponibles para aplicar un descuento.
                  </>
                );
              case '2':
                return (
                  <>
                    Todos los conceptos seleccionados poseen descuento, para quitar un descuento
                    debe seleccionar un (1) concepto.
                  </>
                );
              default:
                return (TableMemo)
            }
          })()}
        </Grid>
      </Grid>
      <Divider />
      <Grid container styles="container" justify="flex-end" spacing={2}>
        <Grid item xs={4} lg={2}>
          <Button size="large" fullWidth onClick={() => { onClose(); setSelected(null)}}>
            { infoToShow ? 'Ok' : 'Cancelar' }
          </Button>
        </Grid>
        {!infoToShow && (
          <Grid item xs={4} lg={2}>
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="secondary"
              disabled={!selected && !modeEdit}
              onClick={handleAllRegister}
            >
              {fetchLoadingRegister ? (
                <CircularProgress size={24} />
              ) : modeEdit ? (
                "Quitar descuento"
              ) : (
                "Agregar"
              )}
            </Button>
          </Grid>
        )}
      </Grid>
    </Paper>
  )
};

export default ModalListDiscount;
