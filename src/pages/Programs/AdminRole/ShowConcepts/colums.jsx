import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { Grid, IconButton, Tooltip } from "@mui/material";
import { Create } from "@mui/icons-material";
// import { AddIcon } from "@material-ui/data-grid";
import AddIcon from "@mui/icons-material/Add";
import { Delete, CheckCircle, Block } from '@mui/icons-material';

import { SnackbarDispatchContext } from "providers/Snackbar/provider";
import { SNACKBAR_SHOW } from "providers/Snackbar/actions";
import useFetch from "hooks/useFetch";

const DeleteButton = ({ row }) => {
    const dispatch = useContext(SnackbarDispatchContext);

    const { fetch: submit, loading: loadingSubmit } = useFetch({});

    const handleDelete = async (row) => {
        const idConcepto = row.original.idConcepto

        if (!window.confirm('Desea desvincular el registro'))
            return;

        const response = await submit({}, {
            url: `/api/coonceptos/${idConcepto}`,
            method: 'delete',
        });

        if (response.status === 204) {
            console.log('handleDelete')

            dispatch({
                type: SNACKBAR_SHOW,
                payload: {
                    idConcepto,
                    severity: "success",
                    message: "Concepto desvincular correctamente",
                },
            });
        }
    };

    return (
        <Tooltip title="Desvincular" aria-label="unlink">
            <IconButton
                onClick={() => handleDelete(row)}
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                style={{ color: 'red' }}
            >
                <Delete fontSize="small" />
            </IconButton>
        </Tooltip>
    )

}

const AddButton = ({ row }) => {

    const dispatch = useContext(SnackbarDispatchContext);

    const { id: idPrograma } = useParams();
    // console.log({ idPrograma })
    const { fetch: submit, loading: loadingSubmit } = useFetch({});

    const handleAdd = async (row) => {

        const idConcepto = row.original.idConcepto;

        if (!window.confirm('Desea asociar este concepto?'))
            return;

        const response = await submit({ idPrograma, idConcepto }, {
            url: '/api/conceptos/programa',//programId
            method: 'post',
        });

        if (response.status !== 201) return

        dispatch({
            type: SNACKBAR_SHOW,
            payload: {
                idConcepto,
                idPrograma,
                severity: "success",
                message: "Concepto asociado correctamente",
            },
        });
    };

    return (
        <Tooltip title="Añadir" aria-label="add">
            <IconButton
                onClick={() => handleAdd(row)}
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                style={{ color: 'green' }}
            >
                <AddIcon />
            </IconButton>
        </Tooltip>
    )
}

const columns = [
    {
        Header: "",
        id: "name",
        isVisible: false,
        hideHeader: false,
        columns: [
            {
                Header: "Descripcion",
                accessor: "descripcion",
            },
            {
                Header: "Importe",
                accessor: "importe",

            },
            {
                Header: "Cantidad de Pagos",
                accessor: "cantidadPagos",
            },
            {
                Header: "Día de Pago",
                accessor: "diaPago",
            },
        ],
    },
];

const conceptsActionCell = {
    Header: "Acciones",
    accessor: "action",
    Cell: ({ row }) => (
        <Grid container>

            <AddButton row={row} />

        </Grid>
    ),
}

const relatedConceptsActionCell = {
    Header: "Acciones",
    accessor: "action",
    Cell: ({ row }) => (
        <Grid container>

            {/* <AddButton row={row} /> */}
            <DeleteButton row={row} />

        </Grid>
    ),
}

export const newConceptColumns = [...columns, conceptsActionCell]

export const programColumns = [...columns, relatedConceptsActionCell];
