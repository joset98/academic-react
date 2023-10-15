import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
} from "@mui/material";

import {
	CreditCardOutlined,
	LocationCity,
	LocationCityOutlined,
	LocationOnOutlined,
	MailOutline,
	PhoneOutlined,
	WorkRounded
} from "@mui/icons-material";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import { DesktopDatePicker as KeyboardDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { KeyboardDatePicker } from "@material-ui/pickers";
import { format } from 'date-fns';

import useFetch from "hooks/useFetch";
import { SnackbarDispatchContext } from "providers/Snackbar/provider";
import { SNACKBAR_SHOW } from "providers/Snackbar/actions";
import { SET_A_PAGE_WITH_INDEX } from "providers/NavegationLevel/actions";
import { NavegationLevelDispatchContext } from "providers/NavegationLevel/provider";
import Text from "components/Text";
import NavigationSection from "layouts/NavigationSection";
import validation from "./validation";
import { Grid, FormControl } from "./styles";
import globals from "constants/globals";

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

	const [collaborator, setCollaborator] = useState({});

	const [collaboratorId, setCollaboratorId] = useState(match.params.id);

	const { departmentCode, codigoProvincia } = watch();

	const [departments, setDepartments] = useState([]);

	const [provincies, setProvinces] = useState([]);

	const [districts, setDistricts] = useState([]);

	const [charges, setCharges] = useState([]);

	const { fetch: submit, loading: loadingSubmit } = useFetch({ uri: "/api/colaboradores" });

	const { fetch: fetchCharges,
		loading: loadingCharges } = useFetch({ uri: "/api/cargos" });

	const { fetch: fetchCollaborator, loading: loadingCollaborator } = useFetch({ loading: !!collaboratorId });

	const { fetch: fetchDepartamentos, loading: loadingDepartments } = useFetch({ uri: "/api/ubigeos/departamentos" });

	const { fetch: fetchProvincias, loading: loadingProvincias } = useFetch({});

	const { fetch: fetchDistritos, loading: loadingDistrito } = useFetch({});

	const dispatchNavegation = useContext(NavegationLevelDispatchContext);

	const loadCharges = async () => {
		const response = await fetchCharges({});
		if (response.status === 200) {
			console.log(response)
			setCharges(
				response.data.map(charge => (
					{
						value: charge.idCargo,
						label: charge.descripcion
					}
				))
			);
		}
	};

	useEffect(() => {
		const navigations = [];

		const title = collaboratorId ? "Editar colaborador" : 'Crear colaborador';

		setTimeout(() => {
			dispatchNavegation({
				type: SET_A_PAGE_WITH_INDEX,
				payload: {
					title,
					pages: navigations,
				}
			});
		}, 100);

	}, [collaborator]);

	const onSubmit = async (data) => {
		const { fechaNacimiento,
			districtCode: codigoDistrito,
			departmentCode: codigoDepartamento,
			address: direccion,
			chargeCode: idCargo,
			tipoDocumento,
			telefono,
			sexo,
			apellidos,
			codigoProvincia,
			colegioProcedencia,
			email,
			nombres,
			numeroDocumento
		} = data;
		console.log(data)

		const formatDate = format(new Date(fechaNacimiento), 'yyyy-MM-dd');

		if (!loadingSubmit) {
			const idColaborador = collaboratorId ?? null; 
			const response = await submit({
				nombres,
				apellidos,
				tipoDocumento,
				numeroDocumento,
				fechaNacimiento: formatDate,
				sexo,
				telefono,
				direccion,
				codigoDepartamento,
				codigoProvincia,
				codigoDistrito,
				email,
				cargo: {
					idCargo
				},
				idCargo,
				idColaborador
			}, {
				method: collaboratorId ? "put" : "post",
			});


			if (response.status === 201 || response.status === 200) {
				const message = collaboratorId ? "Colaborador actualizado correctamente"
					: "Colaborador registrado correctamente";
				dispatch({
					type: SNACKBAR_SHOW,
					payload: {
						severity: "success",
						message,
					},
				});
				history.push("/p/colaboradores");
			}
		}

	};

	const loadCurrentCollaborator = async () => {
		const response = await fetchCollaborator({}, { url: `/api/colaboradores/${collaboratorId}` })
		if (response.status === 200) {
			const {
				cargo: {
					idCargo: chargeCode,
				},
				direccion: address,
				codigoDepartamento: departmentCode,
				codigoDistrito: districtCode,
			} = response.data
			setCollaborator(response.data);
			reset({...response.data, chargeCode, address, departmentCode, districtCode});
		}
	}

	const loadDepartaments = async () => {
		const response = await fetchDepartamentos({});
		if (response.status === 200) {
			console.log(response.status)
			setDepartments(
				response.data.map((e) => ({
					value: e.codigoDepartamento,
					label: e.descripcion,
				}))
			);
		}
	};

	const loadProvinces = async () => {
		const response = await fetchProvincias(
			{},
			{
				url: `/api/ubigeos/departamentos/${departmentCode}/provincias`,
			}
		);
		if (response && response.status === 200) {
			setProvinces(
				response.data.map((e) => ({
					value: e.codigoProvincia,
					label: e.descripcion,
				}))
			);
		}
	};

	const loadDistricts = async () => {
		console.log(departmentCode == '')
		console.log(departmentCode)
		const response = await fetchDistritos(
			{},
			{
				url: `/api/ubigeos/departamentos/${departmentCode}/provincias/${codigoProvincia}/distritos`,
			}
		);
		if (response && response.status === 200) {
			setDistricts(
				response.data.map((e) => ({
					value: e.codigoDistrito,
					label: e.descripcion,
				}))
			);
		}
	};


	useEffect(() => {

		if (collaboratorId) {
			loadCurrentCollaborator();
		}

	}, [])

	useEffect(() => {
		loadCharges();

	}, []);

	useEffect(() => {
		loadDepartaments();
	}, []);

	useEffect(() => {
		if (departmentCode && departmentCode !== "") loadProvinces();
	}, [departmentCode]);

	useEffect(() => {
		if (codigoProvincia && codigoProvincia !== "") loadDistricts();
	}, [codigoProvincia]);


	return (

		<form onSubmit={handleSubmit(onSubmit)}>

			<Paper>

				<Grid container>
					<Grid item xs={12} styles="header">
						<Text>{collaboratorId ? "Editar colaboradores" : "Crear colaboradores"}</Text>
					</Grid>
				</Grid>

				<Grid container styles="container" spacing={2}>
					<Grid item xs={12} md={6}>

						<FormControl variant="filled">
							<InputLabel htmlFor="nombres">Nombres</InputLabel>
							<Controller
								as={FilledInput}
								id="nombres"
								name="nombres"
								defaultValue=""
								control={control}
								autoComplete='off'
								error={errors.nombres}
								placeholder="Nombres"
								startAdornment={(
									<InputAdornment position="start">
										<PersonOutlineOutlinedIcon />
									</InputAdornment>
								)}
							/>
							{errors.nombres && (
								<FormHelperText error>{errors.nombres.message}</FormHelperText>
							)}
						</FormControl>
					</Grid>

					<Grid item xs={12} md={6}>
						<FormControl variant="filled">
							<InputLabel htmlFor="apellidos">Apellidos</InputLabel>
							<Controller
								as={FilledInput}
								id="apellidos"
								defaultValue=""
								control={control}
								name="apellidos"
								autoComplete='off'
								placeholder="Apellidos"
								error={errors.apellidos}
								startAdornment={(
									<InputAdornment position="start">
										<PersonOutlineOutlinedIcon />
									</InputAdornment>
								)}
							/>
							{errors.apellidos && (
								<FormHelperText error>
									{errors.apellidos.message}
								</FormHelperText>
							)}
						</FormControl>
					</Grid>


					<Grid item xs={12} md={4}>
						<FormControl variant="filled">
							<InputLabel htmlFor="email">Email</InputLabel>
							<Controller
								as={FilledInput}
								id="email"
								name="email"
								defaultValue=""
								control={control}
								autoComplete='off'
								placeholder="Email"
								error={errors.email}
								startAdornment={(
									<InputAdornment position="start">
										<MailOutline />
									</InputAdornment>
								)}
							/>
							{errors.email && (
								<FormHelperText error>{errors.email.message}</FormHelperText>
							)}
						</FormControl>
					</Grid>

					<Grid item xs={12} md={4}>
						<FormControl variant="filled">
							<InputLabel htmlFor="telefono">Télefono</InputLabel>
							<Controller
								as={FilledInput}
								id="telefono"
								type="number"
								defaultValue=""
								name="telefono"
								autoComplete='off'
								control={control}
								error={errors.telefono}
								placeholder="Teléfono"
								startAdornment={(
									<InputAdornment position="start">
										<PhoneOutlined />
									</InputAdornment>
								)}
							/>
							{errors.telefono && (
								<FormHelperText error>{errors.telefono.message}</FormHelperText>
							)}
						</FormControl>
					</Grid>

					<Grid item xs={12} md={4}>
						<FormControl variant="filled">
							<Controller
								control={control}
								name="fechaNacimiento"
								id="fechaNacimiento"
								initialFocusedDate={null}
								defaultValue={null}
								as={(
									<KeyboardDatePicker
										variant="inline"
										autoOk
										defaultValue=""
										format="dd/MM/yyyy"
										inputVariant="filled"
										maxDate={new Date()}
										label="Fecha de Nacimiento"
										autoComplete='off'
										views={["year", "month", "date"]}
										invalidDateMessage="Fecha inválida"
										error={errors.fechaNacimiento}
										InputLabelProps={{
											shrink: true,
										}}
									/>
								)}
								error={errors.fechaNacimiento}
							/>
							{errors.fechaNacimiento && (
								<FormHelperText error>
									{errors.fechaNacimiento.message}
								</FormHelperText>
							)}
						</FormControl>
					</Grid>

					<Grid item xs={12} md={3}>
						<FormControl variant="filled">
							<InputLabel htmlFor="tipoDocumento">Tipo de documento</InputLabel>
							<Controller
								as={Select}
								defaultValue=""
								id="tipoDocumento"
								control={control}
								name="tipoDocumento"
								autoComplete='off'
								placeholder="Tipo de documento"
								error={errors.tipoDocumento}
								startAdornment={(
									<InputAdornment position="start">
										<CreditCardOutlined />
									</InputAdornment>
								)}
							>
								{globals.TIPO_DOCUMENTOS.map((e) => (
									<MenuItem value={e.value}>{e.label}</MenuItem>
								))}
							</Controller>
							{errors.tipoDocumento && (
								<FormHelperText error>
									{errors.tipoDocumento.message}
								</FormHelperText>
							)}
						</FormControl>
					</Grid>

					<Grid item xs={12} md={3}>
						<FormControl variant="filled">
							<InputLabel htmlFor="numeroDocumento">
								Número documento
							</InputLabel>
							<Controller
								as={FilledInput}
								control={control}
								id="numeroDocumento"
								name="numeroDocumento"
								autoComplete='off'
								defaultValue=""
								placeholder="Número documento"
								error={errors.numeroDocumento}
								startAdornment={(
									<InputAdornment position="start">
										<CreditCardOutlined />
									</InputAdornment>
								)}
							/>
							{errors.numeroDocumento && (
								<FormHelperText error>
									{errors.numeroDocumento.message}
								</FormHelperText>
							)}
						</FormControl>
					</Grid>



					<Grid item xs={12} md={3}>
						<FormControl variant="filled">
							<InputLabel htmlFor="sexo">Sexo</InputLabel>
							<Controller
								as={(
									<Select>
										{globals.SEXO.map((e) => (
											<MenuItem key={e.value} value={e.value}>
												{e.label}
											</MenuItem>
										))}
									</Select>
								)}
								id="sexo"
								name="sexo"
								defaultValue=""
								placeholder="Sexo"
								control={control}
								error={errors.sexo}
								startAdornment={(
									<InputAdornment position="start">
										<WcOutlinedIcon />
									</InputAdornment>
								)}
							/>
							{errors.sexo && (
								<FormHelperText error>{errors.sexo.message}</FormHelperText>
							)}
						</FormControl>
					</Grid>

					
					<Grid item xs={12} md={3}>

						<FormControl variant="filled">
							<InputLabel htmlFor="chargeCode">Cargo</InputLabel>
							<Controller
								as={(
									<Select>
										{charges.map((e) => (
											<MenuItem key={e.value} value={e.value}>
												{e.label}
											</MenuItem>
										))}
									</Select>
								)}
								defaultValue=""
								control={control}
								id="chargeCode"
								name="chargeCode"
								placeholder="Cargo"
								disabled={loadingCharges}
								error={errors.chargeCode}
								startAdornment={(
									<InputAdornment position="start">
										<WorkRounded />
									</InputAdornment>
								)}
							/>
							{errors.chargeCode && (
								<FormHelperText error>
									{errors.chargeCode.message}
								</FormHelperText>
							)}
						</FormControl>

					</Grid>

					<Grid item xs={12} md={4}>
						<FormControl variant="filled">
							<InputLabel htmlFor="departmentCode">Departamento</InputLabel>
							<Controller
								as={(
									<Select>
										{departments.map((e) => (
											<MenuItem key={e.value} value={e.value}>
												{e.label}
											</MenuItem>
										))}
									</Select>
								)}
								defaultValue=""
								control={control}
								id="departmentCode"
								name="departmentCode"
								placeholder="Departamento"
								disabled={loadingDepartments}
								error={errors.departmentCode}
								startAdornment={(
									<InputAdornment position="start">
										<LocationCity />
									</InputAdornment>
								)}
							/>
							{errors.departmentCode && (
								<FormHelperText error>
									{errors.departmentCode.message}
								</FormHelperText>
							)}
						</FormControl>
					</Grid>

					<Grid item xs={12} md={4}>
						<FormControl variant="filled">
							<InputLabel htmlFor="provincia">Provincia</InputLabel>
							<Controller
								as={(
									<Select>
										{provincies.map((e) => (
											<MenuItem key={e.value} value={e.value}>
												{e.label}
											</MenuItem>
										))}
									</Select>
								)}
								defaultValue=""
								control={control}
								id="codigoProvincia"
								name="codigoProvincia"
								placeholder="Provincia"
								disabled={departmentCode === "" || loadingProvincias}
								error={errors.codigoProvincia}
								startAdornment={(
									<InputAdornment position="start">
										<LocationCity />
									</InputAdornment>
								)}
							/>

							{errors.codigoProvincia && (
								<FormHelperText error>
									{errors.codigoProvincia.message}
								</FormHelperText>
							)}
						</FormControl>
					</Grid>

					<Grid item xs={12} md={4}>
						<FormControl variant="filled">
							<InputLabel htmlFor="districtCode">Distrito</InputLabel>
							<Controller
								as={(
									<Select>
										{districts.map((e) => (
											<MenuItem key={e.value} value={e.value}>
												{e.label}
											</MenuItem>
										))}
									</Select>
								)}
								control={control}
								defaultValue=""
								id="districtCode"
								name="districtCode"
								placeholder="Distrito"
								error={errors.districtCode}
								disabled={codigoProvincia === "" || loadingDistrito}
								startAdornment={(
									<InputAdornment position="start">
										<LocationCity />
									</InputAdornment>
								)}
							/>
							{errors.districtCode && (
								<FormHelperText error>
									{errors.districtCode.message}
								</FormHelperText>
							)}
						</FormControl>
					</Grid>

					<Grid item xs={12}>
						<FormControl variant="filled">
							<InputLabel htmlFor="address">Dirección</InputLabel>
							<Controller
								as={FilledInput}
								id="address"
								defaultValue=""
								name="address"
								control={control}
								autoComplete='off'
								placeholder="Dirección"
								error={errors.address}
								startAdornment={(
									<InputAdornment position="start">
										<LocationOnOutlined />
									</InputAdornment>
								)}
							/>
							{errors.address && (
								<FormHelperText error>
									{errors.address.message}
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
							{loadingSubmit || loadingCollaborator ? <CircularProgress size={24} /> : (
								<>
									{collaboratorId ? 'Editar' : 'Crear'}
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
	title: "Colaboradores",
	pages: [
		{
			path: "/p/colaboradores",
			title: "Colaboradores",
		},
		{
			title: "Nuevo",
		},
	],
})(CreateEdit);
