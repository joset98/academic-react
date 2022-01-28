/* eslint-disable react/prop-types */
import React, {useContext} from "react";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { Create, Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";
import MoneyIcon from "@material-ui/icons/Money";

import { SnackbarDispatchContext } from "providers/Snackbar/provider";
import { SNACKBAR_SHOW } from "providers/Snackbar/actions";
import useFetch from "services/useFetch";


const DeleteButton = ({row}) => {
    const dispatch = useContext(SnackbarDispatchContext);

    const { fetch: submit, loading: loadingSubmit } = useFetch({ });

    const handleDelete = async (idColaborador) => {
		
        if (!window.confirm('Desea Eliminar el registro'))
            return;
            
        const response = await submit({}, { 
            url: `/api/colaboradores/${idColaborador}`,
            method: 'delete',
        });
    
        if (response.status === 204 ) {

            dispatch({
                type: SNACKBAR_SHOW,
                payload: {
                    idColaborador,
                    severity: "success",
                    message: "Colaborador Eliminado correctamente",

                },
            });
        }
    
    };
    
    return (
	<Tooltip title="Eliminar" aria-label="delete">
        <IconButton
            onClick={() => handleDelete(row.original.idColaborador)}
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
				Header: "Nombres",
				accessor: "nombres",
			},
			{
				Header: "Apellidos",
				accessor: "apellidos",
			},
			{
				Header: "Numero de Documento",
				accessor: "numeroDocumento",
			},
			{
				Header: "Email",
				accessor: "email",
			},
			{
				Header: "Télefono",
				accessor: "telefono",
			},
			{
				Header: "Acciones",
				accessor: "action",
				Cell: ({ row }) => (
					<Grid container>
						<Link to={`/p/colaboradores/editar/${row.original.idColaborador}`}>
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
