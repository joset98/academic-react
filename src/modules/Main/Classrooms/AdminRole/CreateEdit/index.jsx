import React, { useContext, useEffect, useState } from "react";
import {
	Button,
	CircularProgress,
	Divider,
	FilledInput,
	FormHelperText,
	InputAdornment,
	InputLabel,
	MenuItem,
	Paper,
	Select,
} from "@material-ui/core";
import NavigationSection from "shared/NavigationSection";
import { useForm, Controller } from "react-hook-form";
import {
	CreditCardOutlined,
	LocationCity,
	LocationCityOutlined,
	LocationOnOutlined,
	MailOutline,
	PhoneOutlined,
} from "@material-ui/icons";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ConfirmationNumberOutlinedIcon from "@material-ui/icons/ConfirmationNumberOutlined";

import Text from "components/Text";
import useFetch from "services/useFetch";
import { SnackbarDispatchContext } from "providers/Snackbar/provider";
import { SNACKBAR_SHOW } from "providers/Snackbar/actions";
import { SET_A_PAGE_WITH_INDEX } from "providers/NavegationLevel/actions";
import { NavegationLevelDispatchContext } from "providers/NavegationLevel/provider";
import validation from "./validation";
import { Grid, FormControl } from "./styles";

const CreateEdit = ({ history, match }) => {

	const {
		handleSubmit,
		control,
		errors,
		watch,
		reset,
		setValue,
		getValues } = useForm({ resolver: validation });

	const dispatch = useContext(SnackbarDispatchContext);

	const [classroom, setClassroom] = useState({});

	const [classroomId, setClassroomId] = useState(match.params.id);

	const [collaborators, setCollaborators] = useState([]);

	const [ciclos, setCiclos] = useState([]);

	const { fetch: submit, loading: loadingSubmit } = useFetch({ uri: "/api/salones" });

	const { fetch: fetchCiclo, loading: loadingCiclos } = useFetch({ uri: "/api/ciclos" });

	const { fetch: fetchCollaborator, loading: loadingCollaborator } = useFetch({ uri: "/api/colaboradores" });

	const { fetch: fetchClassroom, loading: loadingClassroom } = useFetch({ loading: !!classroomId });

	const dispatchNavegation = useContext(NavegationLevelDispatchContext);

	useEffect(() => {
		const navigations = [];

		const title = classroomId ? "Editar Salón" : 'Crear Salón';

		setTimeout(() => {
			dispatchNavegation({
				type: SET_A_PAGE_WITH_INDEX,
				payload: {
					title,
					pages: navigations,
				}
			});
		}, 100);

	}, [classroom]);

	const onSubmit = async (data) => {

		if (!loadingSubmit) {
			const idSalon = classroomId ?? null;
			console.log(data)
			const {
				descripcion,
				ciclo: idCiclo,
				collaborator: idColaborador,
				vacancies: vacantes,
			} = data;

			const response = await submit({ 
				ciclo: {
					idCiclo
				},
				tutor:{
					idColaborador
				},
				descripcion,
				vacantes,
				idSalon
			}, {
				method: classroomId ? "put" : "post",
			});

			if (response.status === 201 || response.status === 200) {
				const message = classroomId ? "Salón actualizado correctamente"
					: "Salón registrado correctamente";
				dispatch({
					type: SNACKBAR_SHOW,
					payload: {
						severity: "success",
						message
					},
				});
				history.push("/p/salones");
			}
		}

	};

	const loadCollaborators = async () => {

		const response = await fetchCollaborator({});
		if (response.status === 200) {
			setCollaborators(
				response.data.map((e) => ({
					value: e.idColaborador,
					label: `${e.nombres} ${e.apellidos} `,
				}))
			);
		}

	};

	const loadCiclos = async () => {

		const response = await fetchCiclo({});
		if (response.status === 200) {
			setCiclos(
				response.data.map((e) => ({
					value: e.idCiclo,
					label: `${e.descripcion} - ${e.nivel.descripcion} - ${e.nivel.modalidad.descripcion}`,
				}))
			);
		}
	};


	const loadCurrentClassroom = async () => {
		const response = await fetchClassroom({}, { url: `/api/salones/${classroomId}` })
		if (response.status === 200) {
			const {
				descripcion,
				vacantes: vacancies,
				ciclo: { idCiclo, descripcion: degree, nivel: { descripcion: level } },
				tutor:{idColaborador: collaborator}

			} = response.data;
			setClassroom(response.data);
			reset({
				vacancies,
				collaborator,
				ciclo: idCiclo,
				descripcion
			});
		}
	}

	useEffect(() => {

		if (classroomId) {
			loadCurrentClassroom();
		}

	}, [])

	useEffect(() => {
		loadCollaborators();
		loadCiclos();
	}, []);

	return (

		<form onSubmit={handleSubmit(onSubmit)}>

			<Paper>

				<Grid container>
					<Grid item xs={12} styles="header">
						<Text>{classroomId ? "Editar Salón" : "Crear Salón"}</Text>
					</Grid>
				</Grid>

				<Grid container styles="container" spacing={2}>

					<Grid item xs={12} md={4}>
						<FormControl variant="filled">
							<InputLabel htmlFor="descripcion">Descripcion</InputLabel>
							<Controller
								as={FilledInput}
								id="descripcion"
								defaultValue=""
								control={control}
								name="descripcion"
								autoComplete='off'
								placeholder="Descripcion"
								error={errors.descripcion}
								startAdornment={(
									<InputAdornment position="start">
										<PersonOutlineOutlinedIcon />
									</InputAdornment>
								)}
							/>
							{errors.descripcion && (
								<FormHelperText error>
									{errors.descripcion.message}
								</FormHelperText>
							)}
						</FormControl>
					</Grid>

					<Grid item xs={12} md={4}>
						<FormControl variant="filled">
							<InputLabel htmlFor="collaborator">Tutor</InputLabel>
							<Controller
								as={(
									<Select>
										{collaborators.map((e) => (
											<MenuItem key={e.value} value={e.value}>
												{e.label}
											</MenuItem>
										))}
									</Select>
								)}
								defaultValue=""
								control={control}
								id="collaborator"
								name="collaborator"
								placeholder="Tutor"
								disabled={loadingCollaborator}
								error={errors.collaborator}
								startAdornment={(
									<InputAdornment position="start">
										<LocationCity />
									</InputAdornment>
								)}
							/>
							{errors.collaborator && (
								<FormHelperText error>
									{errors.collaborator.message}
								</FormHelperText>
							)}
						</FormControl>
					</Grid>

					<Grid item xs={12} md={4}>
						<FormControl variant="filled">
							<InputLabel htmlFor="vacancies">Vacantes</InputLabel>
							<Controller
								as={FilledInput}
								id="vacancies"
								name="vacancies"
								type="number"
								defaultValue=""
								control={control}
								autoComplete='off'
								placeholder="Vacantes"
								error={errors.vacancies}
								startAdornment={(
									<InputAdornment position="start">
										<ConfirmationNumberOutlinedIcon />
									</InputAdornment>
								)}
							/>
							{errors.vacancies && (
								<FormHelperText error>{errors.vacancies.message}</FormHelperText>
							)}
						</FormControl>
					</Grid>


					<Grid item xs={12} md={12}>
						<FormControl variant="filled">
							<InputLabel htmlFor="ciclo">Ciclo</InputLabel>
							<Controller
								as={(
									<Select>
										{ciclos.map((e) => (
											<MenuItem key={e.value} value={e.value}>
												{e.label}
											</MenuItem>
										))}
									</Select>
								)}
								defaultValue=""
								control={control}
								id="ciclo"
								name="ciclo"
								placeholder="Departamento"
								disabled={loadingCiclos}
								error={errors.ciclo}
								startAdornment={(
									<InputAdornment position="start">
										<LocationCity />
									</InputAdornment>
								)}
							/>
							{errors.ciclo && (
								<FormHelperText error>
									{errors.ciclo.message}
								</FormHelperText>
							)}
						</FormControl>
					</Grid>

				</Grid>

				<Divider />

				<Grid container styles="container" justify="flex-end" spacing={2}>

					<Grid item xs={4} md={3} lg={2}>
						<Button size="large" fullWidth onClick={() => history.goBack()}>
							Cancelar
						</Button>
					</Grid>

					<Grid item xs={4} md={3} lg={2}>
						<Button
							fullWidth
							size="large"
							type="submit"
							variant="contained"
							color="secondary"
						>
							{loadingSubmit || loadingClassroom ? <CircularProgress size={24} /> : (
								<>
									{classroomId ? 'Editar' : 'Crear'}
								</>
							)}
						</Button>
					</Grid>

				</Grid>
			</Paper>
		</form>
	);
};

export default NavigationSection({
	title: "Salones",
	pages: [
		{
			path: "/p/salones",
			title: "Salones",
		},
		{
			title: "Nuevo",
		},
	],
})(CreateEdit);
