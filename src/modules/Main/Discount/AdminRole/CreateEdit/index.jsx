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
	Select
} from "@material-ui/core";
import { format } from 'date-fns';
import { KeyboardDatePicker } from "@material-ui/pickers";
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

	const [discount, setDiscount] = useState({});

	const [discountId, setDiscountId] = useState(match.params.id);

	const { fetch: submit, loading: loadingSubmit } = useFetch({ uri: "/api/descuentos" });

	const { fetch: fetchDiscount, loading: loadingDiscount } = useFetch({ loading: !!discountId });

	const dispatchNavegation = useContext(NavegationLevelDispatchContext);

	useEffect(() => {
		const navigations = [];

		const title = discountId ? "Editar Descuento" : 'Crear Descuento';

		setTimeout(() => {
			dispatchNavegation({
				type: SET_A_PAGE_WITH_INDEX,
				payload: {
					title,
					pages: navigations,
				}
			});
		}, 100);

	}, [discount]);

	const onSubmit = async (data) => {

		if (!loadingSubmit) {
			console.log(data)
			const idDescuento = discountId ?? null;
			const response = await submit({ ...data, idDescuento   }, {
				method: discountId ? "put" : "post",
			});

			if (response.status === 201 || response.status === 200) {
				dispatch({
					type: SNACKBAR_SHOW,
					payload: {
						severity: "success",
						message: discountId ? "Descuento actualizado correctamente" : "Descuento registrado correctamente",
					},
				});
				history.push("/p/descuentos");
			}
		}

	};


	const loadCurrentDiscount = async () => {
		const response = await fetchDiscount({}, { url: `/api/descuentos/${discountId}` })
		if (response.status === 200) {

			setDiscount(response.data);
			reset( response.data );
		}
	}

	useEffect(() => {

		if (discountId) {
			loadCurrentDiscount();
		}

	}, [])

	return (

		<form onSubmit={handleSubmit(onSubmit)}>

			<Paper>

				<Grid container>
					<Grid item xs={12} styles="header">
						<Text>{discountId ? "Editar Descuento" : "Crear Descuento"}</Text>
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
							<InputLabel htmlFor="tipoDescuento">Tipo de Descuento</InputLabel>
							<Controller
								as={(
									<Select>
										{globals.TIPO_DESCUENTO.map((type) => (
											<MenuItem key={type.value} value={type.value}>
												{type.label}
											</MenuItem>
										))}
									</Select>
								)}
								id="tipoDescuento"
								name="tipoDescuento"
								defaultValue=""
								placeholder="tipoDescuento"
								control={control}
								error={errors.tipoDescuento}
								startAdornment={(
									<InputAdornment position="start">
										<WcOutlinedIcon />
									</InputAdornment>
								)}
							/>
							{errors.tipoDescuento && (
								<FormHelperText error>{errors.tipoDescuento.message}</FormHelperText>
							)}
						</FormControl>
					</Grid>

					<Grid item xs={12} md={6}>
						<FormControl variant="filled">
							<InputLabel htmlFor="valorDescuento">Valor de Descuento</InputLabel>
							<Controller
								as={FilledInput}
								id="valorDescuento"
								name="valorDescuento"
								type="number"
								defaultValue=""
								control={control}
								autoComplete='off'
								placeholder="Valor de Descuento"
								error={errors.valorDescuento}
								startAdornment={(
									<InputAdornment position="start">
										<ConfirmationNumberOutlinedIcon />
									</InputAdornment>
								)}
							/>
							{errors.valorDescuento && (
								<FormHelperText error>{errors.valorDescuento.message}</FormHelperText>
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
							{loadingSubmit || loadingDiscount ? <CircularProgress size={24} /> : (
								<>
									{discountId ? 'Editar' : 'Crear'}
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
	title: "Descuentos",
	pages: [
		{
			path: "/p/descuentos",
			title: "Descuentos",
		},
		{
			title: "Nuevo",
		},
	],
})(CreateEdit);
