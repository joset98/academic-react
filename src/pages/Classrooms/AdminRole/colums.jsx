import React, {useContext} from "react";
import { Link } from "react-router-dom";

import { Grid, IconButton, Tooltip } from "@mui/material";
import { Create } from "@mui/icons-material";
import {Delete} from '@mui/icons-material';

import useFetch from "hooks/useFetch";
import { SnackbarDispatchContext } from "providers/Snackbar/provider";
import { SNACKBAR_SHOW } from "providers/Snackbar/actions";

const DeleteButton = ({row}) => {
    const dispatch = useContext(SnackbarDispatchContext);

    const { fetch: submit, loading: loadingSubmit } = useFetch({ });

    const handleDelete = async (idSalon) => {
        
        if (!window.confirm('Desea Eliminar el registro'))
            return;
            
        const response = await submit({}, { 
            url: `/api/salones/${idSalon}`,
            method: 'delete',
        });
    
        if (response.status === 204 ) {

            dispatch({
                type: SNACKBAR_SHOW,
                payload: {
                    idSalon,
                    severity: "success",
                    message: "Salón Eliminado correctamente",

                },
            });
        }
    
    };
    
    return (<Tooltip title="Eliminar" aria-label="delete">
        <IconButton
            onClick={() => handleDelete(row.original.idSalon)}
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
                Header: "Nivel",
                accessor: "nivel",
            },
            {
                Header: "Grado",
                accessor: "grado",
            },
            {
                Header: "Sección",
                accessor: "seccion",
            },
            {
                Header: "Vacantes",
                accessor: "vacantes",
            },
            {
                Header: "Vac. Disponibles",
                accessor: "vacantesDisponibles",
            },
            {
                Header: "Acciones",
                accessor: "action",
                Cell: ({ row }) => (
                    <Grid container>

                        <Link to={`/p/salones/editar/${row.original.idSalon}`}>
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
