export default {
	TIPO_DOCUMENTOS: [
		{ value: "0", label: "DNI" },
		{ value: "1", label: "CE" },
	],
	SEXO: [
		{ value: "F", label: "Femenino" },
		{ value: "M", label: "Masculino" },
	],
	ESTADO_PAGO: [
		{ value: "P", label: "Pagado" },
		{ value: "A", label: "Anulado" },
		{ value: "C", label: "Por Validar" },
		{ value: "R", label: "Rechazado" },
	],
	ESTADO_COBRO: [
		{ value: "P", label: "Pagado" },
		{ value: "C", label: "Pendiente" },
		{ value: "V", label: "Vencido" },
		{ value: "X", label: "Por Confirmar" },
	],
	MONEDA: [
		{ value: "S", label: "S/." },
		{ value: "D", label: "$" },
	],
	FRECUENCIA: [
		{ value: "UN", label: "Única" },
		{ value: "ME", label: "Mesual" },
	],
	MEDIO_PAGO_ADMIN: [
		{ value: "EF", label: "Efectivo" },
		{ value: "TR", label: "Transferencia" },
		{ value: "DE", label: "Depósito" },
		{ value: "RB", label: "Recaudación Banco" },
	],
	MEDIO_PAGO_STUDENT: [
		{ value: "TR", label: "Transferencia" },
		{ value: "DE", label: "Depósito" },
		// {value: "PL", label: "Tarjeta Crédito/Débito"},
	],
	TIPO_DESCUENTO: [
		{ value: "P", label: "Porcentaje" },
		{ value: "F", label: "Valor fijo" },
	],
	CANAL_PAGO: [
		{ value: "AD", label: "Administrativo" },
		{ value: "BA", label: "Bancario" },
		{ value: "WE", label: "Web" },
	],
	TIPO_PROGRAMA: [
		{ value: "S", label: "Salón" },
		{ value: "C", label: "Ciclo" },
		{ value: "N", label: "Nivel" },
		{ value: "M", label: "Modalidad" },
	],
};
