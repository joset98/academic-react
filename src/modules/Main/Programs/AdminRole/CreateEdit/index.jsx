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
	Select
} from "@material-ui/core";
import WcOutlinedIcon from "@material-ui/icons/WcOutlined";
import ConfirmationNumberOutlinedIcon from "@material-ui/icons/ConfirmationNumberOutlined";

import NavigationSection from "shared/NavigationSection";
import {
	CreditCardOutlined,
	LocationCity,
	LocationCityOutlined,
	LocationOnOutlined,
	MailOutline,
	PhoneOutlined,
} from "@material-ui/icons";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

import { useForm, Controller } from "react-hook-form";
import Text from "components/Text";
import useFetch from "services/useFetch";
import { SnackbarDispatchContext } from "providers/Snackbar/provider";
import { SNACKBAR_SHOW } from "providers/Snackbar/actions";
import { SET_A_PAGE_WITH_INDEX } from "providers/NavegationLevel/actions";
import { NavegationLevelDispatchContext } from "providers/NavegationLevel/provider";
import validation from "./validation";
import { Grid, FormControl } from "./styles";
import globals from "utils/globals";

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

	const { tipo } = watch();

	const { fetch: fetchTypes, loading: loadingTypes } = useFetch({});

	const { fetch: fetchConcepts, loading: loadingConcepts } = useFetch({});

	const [types, setTypes] = useState([]);

	const [concepts, setConcepts] = useState([]);

	const [selectedConcepts, setSelectedConcepts] = useState([]);

	const [program, setProgram] = useState({});

	const [programId, setProgramId] = useState(match.params.id);

	const { fetch: submit, loading: loadingSubmit } = useFetch({ uri: "/api/programas" });

	const { fetch: fetchProgram, loading: loadingProgram } = useFetch({ loading: !!programId });

	const dispatchNavegation = useContext(NavegationLevelDispatchContext);

	const mapToUrlType = (option) => {

		const optionTypes = {
			S: 'salones',
			C: 'ciclos',
		};
		return optionTypes[option];
	}

	const mapToOptionsType = (option, dataOptions = []) => {
		console.group('option')
		console.log(option)
		console.log(dataOptions)
		try {
			
			const optionTypes = {
	
				S: dataOptions.map( optionClass => ({
						value: optionClass.idSalon, 
						label: `${optionClass.nivel}
								${optionClass.grado}
								${optionClass.seccion}
								`, 
					})
				),
	
				C: dataOptions.map(optionCycle => {
					return {
					value: optionCycle.idCiclo,
					label: `
							${optionCycle.nivel.descripcion} 
							${optionCycle.descripcion} 
							`
					}}
				),
	
				N: [
					{
						value: 1,
						label: 'INICIAL',
					},
					{
						value: 2,
						label: 'PRIMARIA',
					},
					{
						value: 3,
						label: 'SECUNDARIA',
					},
				],
	
				M: [
					{
						value: 1,
						label: 'Regular'
					}
				],
			};
			
			console.log(optionTypes[option])
			console.groupEnd('option')
	
			return optionTypes[option] ?? [];
		} catch (error) {
			console.log(error)
			return [];	
		}

	}

	const loadTypes = async () => {

		if (['N', 'M'].includes(tipo)) return mapToOptionsType(tipo);

		const response = await fetchTypes(
			{},
			{
				url: `/api/${mapToUrlType(tipo)}`,
			}
		);

		if (response && response.status !== 200) return;

		return mapToOptionsType(tipo, response.data);

	};

	const fillingTypes = async () => {
		const optionTypes = await loadTypes();
		setTypes(optionTypes);
	}

	const onSubmit = async (data) => {
		
	
		if (!loadingSubmit) {
			console.log(data)
			const response = await submit({ ...data }, {
				method: programId ? "put" : "post",
			});

			if (response.status === 201 || response.status === 200) {
				dispatch({
					type: SNACKBAR_SHOW,
					payload: {
						severity: "success",
						message: programId ? "Programa actualizado correctamente" :
							"Programa registrado correctamente",
					},
				});
				history.push("/p/programas");
			}
		}

	};

	const loadConcepts = async () => {

		const response = await fetchConcepts(
			{},
			{
				url: '/api/conceptos',
			}
		);
		if (response && response.status === 200) {
			setConcepts(
				// globals
				response.data.map(concept => ({
					value: concept.idConcepto,
					label: `${concept.descripcion} - ${concept.importe} 
					  			${globals.MONEDA.
							find(type => type.value === concept.moneda).label}
								${globals.FRECUENCIA.
							find(type => type.value === concept.frecuencia).label}
						`,
				}))
			);
		}
	}

	const loadCurrentProgram = async () => {
		const response = await fetchProgram({}, { url: `/api/programas/${programId}` })
		if (response.status === 200) {

			setProgram(response.data);
			reset({});
		}
	}

	// effect to Loading types after select ´tipo´
	useEffect(() => {
		if (tipo)
			fillingTypes();

	}, [tipo]);

	useEffect(() => {
		const navigations = [];

		const title = programId ? "Editar Programa" : 'Crear Programa';

		setTimeout(() => {
			dispatchNavegation({
				type: SET_A_PAGE_WITH_INDEX,
				payload: {
					title,
					pages: navigations,
				}
			});
		}, 100);

	}, [program]);

	useEffect(() => {
		loadConcepts();
	}, []);

	useEffect(() => {

		if (programId) {
			loadCurrentProgram();
		}

	}, []);


	return (

		<form onSubmit={handleSubmit(onSubmit)}>

			<Paper>

				<Grid container>
					<Grid item xs={12} styles="header">
						<Text>{programId ? "Editar Programa" : "Crear Programa"}</Text>
					</Grid>
				</Grid>

				<Grid container styles="container" spacing={2}>

					<Grid item xs={12} md={12}>
						<FormControl variant="filled">
							<InputLabel htmlFor="descripcion">Descripcion</InputLabel>

							<Controller
								as={FilledInput}
								id="descripcion"
								name="descripcion"
								defaultValue=""
								control={control}
								autoComplete='off'
								error={errors.descripcion}
								placeholder="Descripcion"
								startAdornment={(
									<InputAdornment position="start">
										<PersonOutlineOutlinedIcon />
									</InputAdornment>
								)}
							/>
							{errors.descripcion && (
								<FormHelperText error>{errors.descripcion.message}</FormHelperText>
							)}
						</FormControl>

					</Grid>

					<Grid item xs={12} md={6}>
						<FormControl variant="filled">
							<InputLabel htmlFor="tipo">Tipo</InputLabel>
							<Controller
								as={(
									<Select>
										{globals.TIPO_PROGRAMA.map((frecuency) => (
											<MenuItem key={frecuency.value} value={frecuency.value}>
												{frecuency.label === 'Ciclo'? 'Grado' : frecuency.label}
											</MenuItem>
										))}
									</Select>
								)}
								id="tipo"
								name="tipo"
								defaultValue=""
								placeholder="Frecuencia"
								control={control}
								error={errors.tipo}
								startAdornment={(
									<InputAdornment position="start">
										<WcOutlinedIcon />
									</InputAdornment>
								)}
							/>
							{errors.tipo && (
								<FormHelperText error>{errors.tipo.message}</FormHelperText>
							)}
						</FormControl>
					</Grid>

					<Grid item xs={12} md={6}>
						<FormControl variant="filled">
							<InputLabel htmlFor="idTipo">Selección de Tipo</InputLabel>
							<Controller
								as={(
									<Select>
										{types.map((e) => (
											<MenuItem key={e.value} value={e.value}>
												{e.label}
											</MenuItem>
										))}
									</Select>
								)}
								defaultValue=""
								control={control}
								id="idTipo"
								name="idTipo"
								placeholder="Tipo"
								disabled={tipo === "" || loadingTypes}
								error={errors.idTipo}
								startAdornment={(
									<InputAdornment position="start">
										<LocationCity />
									</InputAdornment>
								)}
							/>

							{errors.idTipo && (
								<FormHelperText error>
									{errors.idTipo.message}
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
							{loadingSubmit || loadingProgram ? <CircularProgress size={24} /> : (
								<>
									{programId ? 'Editar' : 'Crear'}
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
	title: "Programas",
	pages: [
		{
			path: "/p/programas",
			title: "Programas",
		},
		{
			title: "Nuevo",
		},
	],
})(CreateEdit);
