import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from "react-helmet";
import { IconButton, Paper, Tooltip } from "@material-ui/core";
import { AddIcon } from "@material-ui/data-grid";
import { Link } from "react-router-dom";

import useFetch from "services/useFetch";
import NavigationSection from "shared/NavigationSection";
import Table from "components/Table";
import columns from "./columns";
import { SnackbarContext } from "providers/Snackbar/provider";

function CollaboratorsList() {
	
	const { fetch, loading } = useFetch({
		uri: "/api/colaboradores",
	});
	const [data, setData] = useState([]);

	const {idColaborador = null} = useContext(SnackbarContext);

	const getData = async () => {
		const response = await fetch({});
		if (response.status === 200) {
			setData(response.data);
		}
	};

	const updateCollaboratorsData = (collaborators) => {
		const filterCollaborators = collaborators.filter( (collaborator) =>
			collaborator.idColaborador !== idColaborador)
		
		setData(filterCollaborators);
	}

	useEffect(() => {
		idColaborador && updateCollaboratorsData(data);
	}, [idColaborador]);

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Colaboradores</title>
			</Helmet>
			<Paper>
				<Table
					columns={columns}
					data={data}
					loading={loading}
					right={(
						<Tooltip title="Agregar" aria-label="add">
							<Link to="/p/colaboradores/crear">
								<IconButton
									aria-controls="customized-menu"
									aria-haspopup="true"
									variant="contained"
									color="primary"
								>
									<AddIcon />
								</IconButton>
							</Link>
						</Tooltip>
					)}
				/>
			</Paper>
		</>
	);
}

export default NavigationSection({
	title: "Colaboradores",
	pages: [
		{
			path: "/p/colaboradores",
			title: "Colaboradores",
		},
	],
})(CollaboratorsList);
