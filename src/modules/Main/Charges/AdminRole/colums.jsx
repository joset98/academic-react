import React, { useContext } from "react";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { Create } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Delete, CheckCircle, Block } from '@material-ui/icons';

import { SnackbarDispatchContext } from "providers/Snackbar/provider";
import { SNACKBAR_SHOW } from "providers/Snackbar/actions";
import useFetch from "services/useFetch";


const DeleteButton = ({row}) => {
    const dispatch = useContext(SnackbarDispatchContext);

    const { fetch: submit, loading: loadingSubmit } = useFetch({ });

    const handleDelete = async (row) => {
        const idCargo = row.original.idCargo
       
        if (!window.confirm('Desea Eliminar el registro'))
            return;
            
        const response = await submit({}, { 
            url: `/api/cargos/${idCargo}`,
            method: 'delete',
        });
    
        if (response.status === 204 ) {
            console.log('handleDelete')

            dispatch({
                type: SNACKBAR_SHOW,
                payload: {
                    idCargo,
                    severity: "success",
                    message: "Cargo Eliminado correctamente",
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
                Header: "Tutor",
                accessor: "isTutor",
                Cell: ({ row }) => (

                    <Grid container>

                        <Tooltip title={row.original.isTutor? "Tutor": "No Tutor"} aria-label="tutor">
                            <IconButton
                                aria-controls="customized-menu"
                                aria-haspopup="true"
                                variant="contained"
                            >
                                {
                                    row.original.isTutor? 
                                        <CheckCircle style={{color: "green"}} fontSize="large" />:
                                        <Block color="error" fontSize="large" />}
                            </IconButton>
                        </Tooltip>

                    </Grid>
                ),
            },

            {
                Header: "Acciones",
                accessor: "action",
                Cell: ({ row }) => (
                    <Grid container>

                        <Link to={`/p/cargos/editar/${row.original.idCargo}`}>
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
