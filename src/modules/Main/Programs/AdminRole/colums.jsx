import React, { useContext } from "react";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Create, Delete, Search } from "@material-ui/icons";

import { SnackbarDispatchContext } from "providers/Snackbar/provider";
import { SNACKBAR_SHOW } from "providers/Snackbar/actions";
import useFetch from "services/useFetch";
import globals from "utils/globals";
import Text from "components/Text";

const DeleteButton = ({ row }) => {
    const dispatch = useContext(SnackbarDispatchContext);

    const { fetch: submit, loading: loadingSubmit } = useFetch({});

    const handleDelete = async (row) => {
        const idPrograma = row.original.idPrograma

        if (!window.confirm('Desea Eliminar el registro'))
            return;

        const response = await submit({}, {
            url: `/api/programas/${idPrograma}`,
            method: 'delete',
        });

        if (response.status === 204) {
            console.log('handleDelete')

            dispatch({
                type: SNACKBAR_SHOW,
                payload: {
                    idPrograma,
                    severity: "success",
                    message: "Programa Eliminado correctamente",
                },
            });
        }

    };

    return (
        <Tooltip title="Eliminar" aria-label="delete">
            <IconButton
                onClick={() => handleDelete(row)}
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
            >
                <Delete fontSize="small" />
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
                Header: "Tipo",
                accessor: "tipo",
                Cell: ({ row }) => (
                    <Grid container>
                        <Text>
                            {
                                globals.TIPO_PROGRAMA
                                    .find(type => type.value === row.original.tipo).label
                            }
                        </Text>
                    </Grid>
                ),
            },
            {
                Header: "Acciones",
                accessor: "action",
                Cell: ({ row }) => (
                    <Grid container>

                        <Link to={`/p/programas/${row.original.idPrograma}/conceptos`}>
                            <Tooltip title="Ver Conceptos" aria-label="show">
                                <IconButton
                                    aria-controls="customized-menu"
                                    aria-haspopup="true"
                                    variant="contained"
                                    color="primary"
                                >
                                    <Search fontSize="small" />
                                </IconButton>
                            </Tooltip>

                        </Link>

                        <Link to={`/p/programas/editar/${row.original.idPrograma}`}>
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

                        <DeleteButton row={row} />
                    </Grid>
                ),
            },
        ],
    },
];

export default columns;
