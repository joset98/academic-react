import React, { useContext, useEffect, useState } from "react";
import {
	Button,
	Checkbox,
	CircularProgress,
	Divider,
	FilledInput,
	FormHelperText,
	InputAdornment,
	InputLabel,
	MenuItem,
	Paper,
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

	const [charge, setCharge] = useState({});

	const [chargeId, setChargeId] = useState(match.params.id);

	const { fetch: submit, loading: loadingSubmit } = useFetch({ uri: "/api/cargos" });

	const { fetch: fetchCharges, loading: loadingCharge } = useFetch({ loading: !!chargeId });

	const dispatchNavegation = useContext(NavegationLevelDispatchContext);

	useEffect(() => {
		const navigations = [];

		const title = chargeId ? "Editar Cargo" : 'Crear Cargo';

		setTimeout(() => {
			dispatchNavegation({
				type: SET_A_PAGE_WITH_INDEX,
				payload: {
					title,
					pages: navigations,
				}
			});
		}, 100);

	}, [charge]);

	const onSubmit = async (data) => {

		if (!loadingSubmit) {
			console.log(data)
			const {description:descripcion, isTutor} = data; 
			const response = await submit({ descripcion, isTutor, idCargo: chargeId }, {
				method: chargeId ?"put":"post",
			});

			if (response.status === 201 || response.status === 200) {
				dispatch({
					type: SNACKBAR_SHOW,
					payload: {
						severity: "success",
						message: chargeId? "Cargo actualizado correctamente": "Cargo registrado correctamente",
					},
				});
				history.push("/p/cargos");
			}
		}

	};

	const loadCurrentCharges = async () => {
		const response = await fetchCharges({}, { url: `/api/cargos/${chargeId}` })
		if (response.status === 200) {

			setCharge(response.data);
			reset({description: response.data.descripcion, isTutor: response.data.isTutor});
		}
	}

	useEffect(() => {

		if (chargeId) {
			loadCurrentCharges();
		}

	}, [])

	return (

		<form onSubmit={handleSubmit(onSubmit)}>

			<Paper>

				<Grid container>
					<Grid item xs={12} styles="header">
						<Text>{chargeId ? "Editar Cargo" : "Crear Cargo"}</Text>
					</Grid>
				</Grid>

				<Grid container styles="container" spacing={2}>

					<Grid item xs={12} md={6}>
						<FormControl variant="filled">
							<InputLabel htmlFor="description">Descripcion del cargo</InputLabel>

							<Controller
								as={FilledInput}
								id="description"
								name="description"
								defaultValue=""
								control={control}
								autoComplete='off'
								error={errors.description}
								placeholder="Descripcion"
								startAdornment={(
									<InputAdornment position="start">
										<PersonOutlineOutlinedIcon />
									</InputAdornment>
								)}
							/>
							{errors.description && (
								<FormHelperText error>{errors.description.message}</FormHelperText>
							)}
						</FormControl>

					</Grid>

					<Grid item xs={12} md={6} style={{display: 'flex', justifyContent: 'center',
						alignItems: 'center',flexDirection: 'column'}}>

							<InputLabel htmlFor="istutor">Tutor</InputLabel>

							<Controller
								id="isTutor"
								name="isTutor"
								defaultValue={false}
								control={control}
								error={errors.isTutor}
								startAdornment={(
									<InputAdornment position="start">
										<PersonOutlineOutlinedIcon />
									</InputAdornment>
								)}
								render={(
									{ onChange, onBlur, value, name, ref },
									{ invalid, isTouched, isDirty }
								) => (
									<Checkbox
										onBlur={onBlur}
										onChange={(e) => onChange(e.target.checked)}
										checked={value}
										inputRef={ref}
									/>
								)}
							/>
							{errors.isTutor && (
								<FormHelperText error>
									{errors.isTutor.message}
								</FormHelperText>
							)}
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
							{loadingSubmit || loadingCharge ? <CircularProgress size={24} /> : (
								<>
									{chargeId ? 'Editar' : 'Crear'}
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
	title: "Cargos",
	pages: [
		{
			path: "/p/cargos",
			title: "Cargos",
		},
		{
			title: "Nuevo",
		},
	],
})(CreateEdit);
