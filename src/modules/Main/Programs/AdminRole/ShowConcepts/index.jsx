import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { Divider, IconButton, Paper, Tooltip } from "@material-ui/core";
import { AddIcon } from "@material-ui/data-grid";
import { Link } from "react-router-dom";

import useFetch from "services/useFetch";
import Table from "components/Table";
import NavigationSection from "shared/NavigationSection";
import Text from "components/Text";
import { NavegationLevelDispatchContext } from "providers/NavegationLevel/provider";
import { SET_A_PAGE_WITH_INDEX } from "providers/NavegationLevel/actions";
import { Grid } from "../CreateEdit/styles";

import { newConceptColumns, programColumns } from "./colums";
import { SnackbarContext } from "providers/Snackbar/provider";
import CreateConceptDialog from "../DialogCreate";

const Concepts = ({ history, match }) => {

	const dispatchNavegation = useContext(NavegationLevelDispatchContext);

	const { idPrograma = null } = useContext(SnackbarContext);

	// URL Param
	const [programId, setProgramId] = useState(match.params.id);

	const { fetch, loading } = useFetch({
		uri: "/api/conceptos",
	});

	const { fetch: fetchCurrentProgram, loading: loadingCurrentProgram } = useFetch({ loading: !!programId });

	const { fetch: fetchProgramConcepts, loading: loadingProgram } = useFetch({});

	const [data, setData] = useState([]);

	const [programConcepts, setProgramConcepts] = useState([]);

	const [program, setProgram] = useState({});

	const [display, setDisplay] = useState(false);

	const handleOpen = () => {
		setDisplay(true);
	};

	const handleClose = () => {
		setDisplay(false);
	};
	
	const filterRelatedConcepts = (conceptList) => {
		const uniqueRelatedIds = new Set (programConcepts.map(item => item.idConcepo));
		const relatedFilter = conceptList.filter( item => !uniqueRelatedIds.has(item.idConcepto)); 
		// console.log(relatedFilter)
		return relatedFilter;
	}
	
	const getData = async () => {
		const response = await fetch({});
		if (response.status === 200) {
			setData(response.data);
			// setData(filterRelatedConcepts(response.data));
		}
	};

	const getProgramConcepts = async () => {

		const response = await fetchProgramConcepts(
			{},
			{
				url: `/api/conceptos?idPrograma=${programId}`,
			}
		);

		if (response && response.status === 200) {
			setProgramConcepts(response.data);
		}
	}

	const getCurrentDataProgram = async () => {
		if (Object.keys(program).length > 0 ) return ;

		const response = await fetchCurrentProgram(
			{},
			{
				url: `/api/programas/${programId}`,
			}
		);
		if (response && response.status === 200) {
			setProgram(response.data);
		}
	}

	useEffect(() => {
		const navegations = [];

		if (programId && program.descripcion) {
			const { descripcion } = program;
			navegations.push(
				{
					index: '1',
					title: (`${descripcion}`).toLowerCase(),
				}
			);
		};

		setTimeout(() => {
			dispatchNavegation({
				type: SET_A_PAGE_WITH_INDEX,
				payload: {
					title: "Ver conceptos asociados",
					pages: navegations,
				}
			});
		}, 100);

	}, [program]);

	useEffect(() => {
		getData();
	}, []);

	// effect to fetch concepts related to selected program
	useEffect(() => {
		programId && getProgramConcepts();
		programId && getCurrentDataProgram();
	}, [programId, idPrograma]);

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Programas</title>
			</Helmet>
			<Paper>
				<Grid container>
					<Grid item xs={12} styles="header">
						<Text>Conceptos Asociados</Text>
					</Grid>
				</Grid>

				<Table
					columns={programColumns}
					data={programConcepts}
					loading={loadingProgram}
				/>
				<Divider />

				<Grid container>
					<Grid item xs={12} styles="header">
						<Text>Conceptos</Text>
					</Grid>
				</Grid>

				<Table
					columns={newConceptColumns}
					data={data}
					loading={loading}
					right={(
						<Tooltip title="Registrar Nuevo" aria-label="add">
							<IconButton
								aria-controls="customized-menu"
								aria-haspopup="true"
								variant="contained"
								onClick={handleOpen}
								color="primary"
							>
								<AddIcon />
							</IconButton>
						</Tooltip>
					)}
				/>

				<CreateConceptDialog 
					isOpen={display} 
					handleOpen={handleOpen}
					handleClickClose={handleClose}
					callbackFetch={getData}
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

