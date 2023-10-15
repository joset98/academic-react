import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Grid, IconButton, Tooltip } from "@mui/material";
import { Create } from "@mui/icons-material";
import { Delete, CheckCircle, Block } from '@mui/icons-material';
import { SnackbarDispatchContext } from "providers/Snackbar/provider";
import { SNACKBAR_SHOW } from "providers/Snackbar/actions";
import useFetch from "hooks/useFetch";

const DeleteButton = ({row}) => {
    const dispatch = useContext(SnackbarDispatchContext);

    const { fetch: submit, loading: loadingSubmit } = useFetch({ });

    const handleDelete = async (row) => {
        const idCargo = row.original.idConcepto
       
        if (!window.confirm('Desea Eliminar el registro'))
            return;
            
        const response = await submit({}, { 
            url: `/api/coonceptos/${idConcepto}`,
            method: 'delete',
        });
    
        if (response.status === 204 ) {
            console.log('handleDelete')

            dispatch({
                type: SNACKBAR_SHOW,
                payload: {
                    idConcepto,
                    severity: "success",
                    message: "Concepto Eliminado correctamente",
                },
            });
        }
    
    };
    
    return (<Tooltip title="Eliminar" aria-label="delete">
        <IconButton
            onClick={() => handleDelete(row)}
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
        >
            <Delete fontSize="small" />
        </IconButton>
    </Tooltip>)

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
            {
                Header: "Acciones",
                accessor: "action",
                Cell: ({ row }) => (
                    <Grid container>

                        <Link to={`/p/conceptos/editar/${row.original.idConcepto}`}>
                            <Tooltip title="Editar" aria-label="edit">
                                <IconButton
                                    aria-controls="customized-menu"
                                    aria-haspopup="true"
                                    variant="contained"
                                    color="primary"
                                >
                                    <Create fontSize="small" />
                                </IconButton>
                            </Tooltip>

                        </Link>

                        <DeleteButton row={row}/>
                    </Grid>
                ),
            },
        ],
    },
];

export default columns;
