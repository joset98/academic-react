import React, { useEffect, useState, useContext } from "react";

import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { IconButton, Paper, Tooltip } from "@mui/material";
// import { AddIcon } from "@material-ui/data-grid";
import AddIcon from "@mui/icons-material/Add";
import GlobalIcon from '@mui/material/Icon';

import useFetch from "hooks/useFetch";
import { SnackbarContext } from "providers/Snackbar/provider";
import NavigationSection from "layouts/NavigationSection";
import Table from "components/Table";
import columns from "./colums";


const Concepts = ({history, match}) => {

	const { fetch, loading } = useFetch({
		uri: "/api/programas",
	});

	const {idPrograma = null} = useContext(SnackbarContext);

	const [data, setData] = useState([]);

	const getData = async () => {
		const response = await fetch({});
		if (response.status === 200) {
			setData(response.data);
		}
	};

	const updateProgramData = (programs) => {
		const filterPrograms = programs.filter( (program) => program.idPrograma !== idPrograma)
		setData(filterPrograms);
	}

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		idPrograma && updateProgramData(data);
	}, [idPrograma]);

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Programas</title>
			</Helmet>
			<Paper>
				<Table
					columns={columns}
					data={data}
					loading={loading}
					right={(
						<Tooltip title="Agregar" aria-label="add">
							<Link to="/p/programas/crear">
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
};

export default NavigationSection({
	title: "Programas",
	pages: [
		{
			path: "/p/programas",
			title: "Programas",
		},
	],
})(Concepts);

