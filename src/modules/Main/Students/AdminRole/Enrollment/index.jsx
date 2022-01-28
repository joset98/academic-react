import React, { useContext, useEffect, useMemo, useState } from "react";
import {
	Button,
	CircularProgress,
	Divider,
	Hidden,
	ListItem,
	ListItemText,
	Paper,
} from "@material-ui/core";
import { Helmet } from "react-helmet";
import NavigationSection from "shared/NavigationSection";
import Table from "components/Table";
import useFetch from "services/useFetch";
import { SnackbarDispatchContext } from "providers/Snackbar/provider";
import { SNACKBAR_SHOW } from "providers/Snackbar/actions";
import { Text, List, Grid } from "./styles";
import columns from "./columns";

const Enrollment = ({ history, match }) => {
	const { fetch, loading } = useFetch({
		uri: "/api/salones",
		loading: true,
	});

	const { fetch: fetchStudent, loading: loadingStudent } = useFetch({
		uri: "/api/estudiantes",
		loading: true,
	});

	const { fetch: submit, loading: loadingSubmit } = useFetch({
		uri: "/api/matriculas",
		method: "post",
	});

	const [dataStudent, setDataStudent] = useState({
		idEstudiante: match.params.id,
		idSalon: null,
		nombres: null,
		apellidos: null,
	});

	const [initialData, setInitialData] = useState([]);
	const [data, setData] = useState([]);
	const [selected, setSelected] = useState(null);
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const dispatch = useContext(SnackbarDispatchContext);

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
		setSelected(null);
	};

	const getData = async () => {
		const response = await fetch({});
		if (response.status === 200) {
			setInitialData(
				response.data.map((e) => (
					{
						idSalon: e.idSalon,
						nivel: e.nivel,
						grado: e.grado,
						seccion: e.seccion,
						idNivel: e.idNivel,
						vacantes: e.vacantes,
						vacantesDisponibles: e.vacantesDisponibles,
					})
				)
			);
		}
	};

	const getStudentData = async () => {
		const response = await fetchStudent(
			{},
			{ url: `/api/estudiantes/${dataStudent.idEstudiante}` }
		);
		if (response.status === 200) {
			setDataStudent({
				...dataStudent,
				nombres: response.data.nombres,
				apellidos: response.data.apellidos,
				idSalon: Number(response.data.idSalon),
			});
			getData();
		}
	};

	const enroll = async () => {
		if (!loadingSubmit) {
			const response = await submit(
				{
					salon: {
						idSalon: selected.idSalon,
					},
					estudiante: {
						idEstudiante: match.params.id,
					},
				},
				{
					method: "post",
				}
			);

			if (response.status === 201 || response.status === 200) {
				dispatch({
					type: SNACKBAR_SHOW,
					payload: {
						severity: "success",
						message: "Estudiante registrado correctamente",
					},
				});
				history.push("/p/estudiantes");
			}
		}
	};

	const unenroll = async () => {
		if (!loadingSubmit) {
			const response = await submit(
				{
					salon: {
						idSalon: dataStudent.idSalon,
					},
					estudiante: {
						idEstudiante: match.params.id,
					},
				},
				{
					method: "delete",
				}
			);
			if (response.status === 204) {
				dispatch({
					type: SNACKBAR_SHOW,
					payload: {
						severity: "success",
						message: "Estudiante eliminado correctamente",
					},
				});
				history.push("/p/estudiantes");
			}
		}
	};

	const table = useMemo(
		() => (
			<Table
				columns={columns}
				autoResetSelectedRows={false}
				selectedOne
				loading={loading}
				selectDefault={dataStudent.idSalon ? "0" : null}
				handleClickRow={(id) => setSelected(id)}
				data={data}
			/>
		),
		[data, dataStudent.idSalon, loading]
	);

	useEffect(() => {
		if (dataStudent.idSalon) {
			const index = initialData.findIndex(
				(e) => e.idSalon === dataStudent.idSalon
			);

			setData([initialData[index]]);
		} else {
			setData(initialData);
		}
	}, [initialData]);

	useEffect(() => {
		setData(
			initialData.filter(
				(e) => selectedIndex === 0 || e.idNivel === selectedIndex
			)
		);
	}, [selectedIndex]);

	useEffect(() => {
		getStudentData();
	}, []);

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Matricula</title>
			</Helmet>
			<Paper>
				<Grid container>
					<Hidden mdDown>
						<Grid item xs={2}>
							<Text styles="filters">FILTROS</Text>
							<List component="nav" aria-label="main mailbox folders">
								<Divider />
								<ListItem
									disabled={dataStudent.idSalon}
									button
									selected={selectedIndex === 0}
									onClick={(event) => handleListItemClick(event, 0)}
								>
									<ListItemText primary="Todos" />
								</ListItem>
								<ListItem
									disabled={dataStudent.idSalon}
									button
									selected={selectedIndex === 1}
									onClick={(event) => handleListItemClick(event, 1)}
								>
									<ListItemText primary="Inicial" />
								</ListItem>
								<ListItem
									disabled={dataStudent.idSalon}
									button
									selected={selectedIndex === 2}
									onClick={(event) => handleListItemClick(event, 2)}
								>
									<ListItemText primary="Primaria" />
								</ListItem>
								<ListItem
									disabled={dataStudent.idSalon}
									button
									selected={selectedIndex === 3}
									onClick={(event) => handleListItemClick(event, 3)}
								>
									<ListItemText primary="Secundaria" />
								</ListItem>
							</List>
						</Grid>
					</Hidden>

					<Grid item xs={12} lg={10} styles="right">
						<Text styles="student">
							Matricula:
							{`${dataStudent.nombres || "-"} ${dataStudent.apellidos || "-"}`}
						</Text>
						{table}
						<Divider />
						<Grid
							item
							container
							xs={12}
							justify="flex-end"
							styles="footer"
							spacing={2}
						>
							<Grid item xs={4} sm={3} md={2}>
								<Button size="large" fullWidth onClick={() => history.goBack()}>
									Cancelar
								</Button>
							</Grid>
							<Grid item xs={7} sm={3} md={3}>
								<Button
									disabled={!selected && !dataStudent.idSalon}
									size="large"
									variant="contained"
									color="secondary"
									fullWidth
									onClick={() => {
										if (dataStudent.idSalon) unenroll();
										else enroll();
									}}
								>
									{loadingSubmit ? (
										<CircularProgress size={24} />
									) : (
										`${dataStudent.idSalon ? "Quitar matricula" : "Matricular"}`
									)}
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</>
	);
};

export default NavigationSection({
	title: "Matricula",
	pages: [
		{
			path: "/p/estudiantes",
			title: "Estudiantes",
		},
		{
			title: "Matricula",
		},
	],
})(Enrollment);
