import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { IconButton, Paper, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// import { AddIcon } from "@material-ui/data-grid";

import useFetch from "hooks/useFetch";
import { SnackbarContext } from "providers/Snackbar/provider";
import NavigationSection from "layouts/NavigationSection";
import Table from "components/Table";
import columns from "./colums";

const Concepts = ({history, match}) => {

	const { fetch, loading } = useFetch({
		uri: "/api/conceptos",
	});

	const {idConcepto = null} = useContext(SnackbarContext);

	const [data, setData] = useState([]);

	const getData = async () => {
		const response = await fetch({});
		if (response.status === 200) {
			setData(response.data);
		}
	};

	const updateConceptData = (concepts) => {
		const filterConcepts = concepts.filter( (concepts) => charge.idConcepto !== idConcepto)
		setData(filterConcepts);
	}

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		idConcepto && updateConceptData(data);
	}, [idConcepto]);

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Conceptos</title>
			</Helmet>
			<Paper>
				<Table
					columns={columns}
					data={data}
					loading={loading}
					right={(
						<Tooltip title="Agregar" aria-label="add">
							<Link to="/p/conceptos/crear">
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
	title: "Conceptos",
	pages: [
		{
			path: "/p/conceptos",
			title: "Conceptos",
		},
	],
})(Concepts);

