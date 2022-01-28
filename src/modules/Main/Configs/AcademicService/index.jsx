import React, { useEffect, useState } from "react";
import useFetch from "services/useFetch";
import Table from "components/Table";
import NavigationSection from "shared/NavigationSection";
import { Helmet } from "react-helmet";
import { IconButton, Paper, Tooltip } from "@material-ui/core";
import { AddIcon } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
// import columns from "./columns";

const levelArray = [
	{
		"idNivel": 1,
		"descipcion": "nivel",
		"detalle": [
			{
				"id": 2,
				"idPadre": 1,
				"descripcion": "Inicial"
			},
			{
				"id": 3,
				"idPadre": 1,
				"descripcion": "Primaria"
			},
			{
				"id": 4,
				"idPadre": 1,
				"descripcion": "Secundaria"
			}
		]
	},
	{
		"idNivel": 2,
		"descipcion": "Grado",
		"detalle": [
			{
				"id": 5,
				"idPadre": 2,
				"descripcion": "3 años"
			},
			{
				"id": 6,
				"idPadre": 2,
				"descripcion": "4 años"
			},
			{
				"id": 7,
				"idPadre": 2,
				"descripcion": "5 años"
			},
			{
				"id": 8,
				"idPadre": 3,
				"descripcion": "primero"
			},
			{
				"id": 9,
				"idPadre": 3,
				"descripcion": "segundo"
			}
		]
	}
]

const AcademicService = () => {

	const generateHeaders = (levelTree) => {
		return levelTree.map( level => (
			{ Header: level.descipcion, accessor: level.descipcion }
		)
		);
	}
	
	const generateColumns = (levelTree) => {
		return levelTree.map( level => (
			{ ...level.detalle }
		)
		);
	}

	const arrayHeader = generateHeaders(levelArray);
	const arrayColumns = generateColumns(levelArray);
	console.log(arrayColumns)
	const headers = [
		{
			Header: "",
			id: "name",
			isVisible: false,
			hideHeader: false,
			columns: arrayHeader
		},
	]

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Configuración del Servicio Educativo</title>
			</Helmet>

			<Paper>

				<Table
					columns={headers}
					data={arrayColumns}
					loading={false}
					right={(
						<Tooltip title="Agregar Nivel" aria-label="add">
							<Link to="/p/estudiantes/crear">
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
	title: "Configuraciones",
	pages: [
		{
			path: "/p/configuraciones/servicio-academico",
			title: "Configuraciones",
		},
	],
})(AcademicService);
