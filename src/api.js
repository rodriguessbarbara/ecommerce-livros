import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

async function POST_USER(body) {
	const response = await API.post("/clientes", body, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
}

async function CHECK_USER(body) {
	const response = await API.post("/clientes/login", body, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
}

async function GETALL_ENTIDADE(entidade) {
	const response = await API.get(`/${entidade}`);
	return response;
}

async function GET_USER(userId) {
	const response = await API.get(`/clientes/${userId}`);
	return response;
}

async function UPDATE_USER(userId, newData) {
	const response = await API.patch(`/clientes/${userId}`, newData, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
}

async function DELETE_USER(userId) {
	const response = await API.delete(`/clientes/${userId}`);
	return response;
}

//Livros
async function GETBYNOME_LIVRO(nome) {
	const response = await API.get(`/livros/nome/${nome}`);
	return response;
}

export {
	GETALL_ENTIDADE,
	GET_USER,
	POST_USER,
	UPDATE_USER,
	DELETE_USER,
	CHECK_USER,
	GETBYNOME_LIVRO,
};
