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

const Classrooms = () => {

	const { fetch, loading } = useFetch({
		uri: "/api/salones",
	});

	const [data, setData] = useState([]);

	const {idSalon = null} = useContext(SnackbarContext);

	const getData = async () => {
		const response = await fetch({});
		if (response.status === 200) {
			setData(response.data);
		}
	};

	const updateClassroomData = (classrooms) => {
		const filterClassroom = classrooms.filter( (classroom) => classroom.idSalon !== idSalon)
		setData(filterClassroom);
	}

	useEffect(() => {
		idSalon && updateClassroomData(data);
	}, [idSalon]);

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Salones</title>
			</Helmet>
			<Paper>
				<Table
					columns={columns}
					data={data}
					loading={loading}
					right={(
						<Tooltip title="Agregar" aria-label="add">
							<Link to="/p/salones/crear">
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
	title: "Salones",
	pages: [
		{
			path: "/p/salones",
			title: "Salones",
		},
	],
})(Classrooms);

