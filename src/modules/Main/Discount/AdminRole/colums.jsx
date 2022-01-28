import React, { useContext } from "react";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Create, Delete } from "@material-ui/icons";

import { SnackbarDispatchContext } from "providers/Snackbar/provider";
import { SNACKBAR_SHOW } from "providers/Snackbar/actions";
import useFetch from "services/useFetch";
import globals from "utils/globals";
import Text from "components/Text";

const DeleteButton = ({row}) => {
    const dispatch = useContext(SnackbarDispatchContext);

    const { fetch: submit, loading: loadingSubmit } = useFetch({ });

    const handleDelete = async (row) => {
        const idDescuento = row.original.idDescuento
       
        if (!window.confirm('Desea Eliminar el registro'))
            return;
            
        const response = await submit({}, { 
            url: `/api/descuentos/${idDescuento}`,
            method: 'delete',
        });
    
        if (response.status === 204 ) {
            console.log('handleDelete')

            dispatch({
                type: SNACKBAR_SHOW,
                payload: {
                    idDescuento,
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
                Header: "Tipo de Descuento",
                accessor: "tipoDescuento",
                Cell: ({ row }) => (
                    <Grid container>
                        <Text>
                            {
                                globals.TIPO_DESCUENTO
                                .find( type => type.value === row.original.tipoDescuento).label
                            }
                        </Text>
                    </Grid>
                ),
                
            },
            {
                Header: "Valor de Descuento",
                accessor: "valorDescuento",
                
            },
            {
                Header: "Acciones",
                accessor: "action",
                Cell: ({ row }) => (
                    <Grid container>

                        <Link to={`/p/descuentos/editar/${row.original.idDescuento}`}>
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
