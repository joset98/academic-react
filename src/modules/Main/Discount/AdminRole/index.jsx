import React, { useEffect, useState, useContext } from "react";
import useFetch from "services/useFetch";
import Table from "components/Table";
import NavigationSection from "shared/NavigationSection";
import { Helmet } from "react-helmet";
import { IconButton, Paper, Tooltip } from "@material-ui/core";
import { AddIcon } from "@material-ui/data-grid";
import { Link } from "react-router-dom";

import columns from "./colums";
import { SnackbarContext } from "providers/Snackbar/provider";
// import GlobalIcon from '@material-ui/core/Icon';

const Concepts = ({history, match}) => {

	const { fetch, loading } = useFetch({
		uri: "/api/descuentos",
	});

	const {idDescuento = null} = useContext(SnackbarContext);

	const [data, setData] = useState([]);

	const getData = async () => {
		const response = await fetch({});
		if (response.status === 200) {
			setData(response.data);
		}
	};

	const updateDiscountData = (discounts) => {
		const filterDiscounts = discounts.filter( (discount) => discount.idDescuento !== idDescuento)
		setData(filterDiscounts);
	}

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		idDescuento && updateDiscountData(data);
	}, [idDescuento]);

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Descuentos</title>
			</Helmet>
			<Paper>
				<Table
					columns={columns}
					data={data}
					loading={loading}
					right={(
						<Tooltip title="Agregar" aria-label="add">
							<Link to="/p/descuentos/crear">
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
	title: "Descuentos",
	pages: [
		{
			path: "/p/descuentos",
			title: "Descuentos",
		},
	],
})(Concepts);

