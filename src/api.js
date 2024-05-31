import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:8000" });

async function LOGIN_USER(body) {
	const response = await API.post("/clientes/auth/login", body, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
}

async function VALIDATE_TOKEN(token) {
	const response = await API.get("/validate-token", {
		headers: {
			Authorization: token,
		},
	});
	return response;
}

async function GET_USER(token) {
	const response = await API.get("/cliente", {
		headers: {
			Authorization: "Bearer " + token,
		},
	});
	return response;
}

async function GET_USERBYID(id) {
	const response = await API.get(`/clientes/${id}`, {
		headers: {
			Authorization: "Bearer " + window.localStorage.getItem("token"),
		},
	});
	return response;
}

async function DELETE_USER(userId) {
	const response = await API.delete(`/$clientes/${userId}`, {
		headers: {
			Authorization: "Bearer " + window.localStorage.getItem("token"),
		},
	});
	return response;
}

async function UPDATE_USER(id, newData) {
	const response = await API.patch(`/clientes/${id}`, newData, {
		headers: {
			// "Content-Type": "application/json",
			Authorization: "Bearer " + window.localStorage.getItem("token"),
		},
	});
	return response;
}

async function UPDATE_SENHA_USER(id, newSenha) {
	const response = await API.patch(`/clientes/senha/${id}`, newSenha, {
		headers: {
			Authorization: "Bearer " + window.localStorage.getItem("token"),
		},
	});
	return response;
}

async function POST_ENTIDADE(body, entidade) {
	const response = await API.post(`/${entidade}`, body, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
}

async function GETALL_ENTIDADE(entidade) {
	const response = await API.get(`/${entidade}/`);
	return response;
}

async function GET_ENTIDADE(id, entidade) {
	const response = await API.get(`/${entidade}/${id}`);
	return response;
}

async function UPDATE_ENTIDADE(id, newData, entidade) {
	const response = await API.patch(`/${entidade}/${id}`, newData, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
}

async function DELETE_ENTIDADE(userId, entidade) {
	const response = await API.delete(`/${entidade}/${userId}`);
	return response;
}

//Livros
async function GETBYNOME(nome, entidade) {
	const response = await API.get(`/${entidade}/nome/${nome}`);
	return response;
}

//Cupom
async function CHECK_CUPOM(body) {
	const response = await API.post("/cupom/validar", body, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
}

//Gráfico
async function filtrarPedidosDatas(data) {
	const response = await API.post(`/grafico/buscar-pedidos`, data, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response.data;
}

export {
	GETALL_ENTIDADE,
	GET_ENTIDADE,
	GET_USER,
	GET_USERBYID,
	DELETE_USER,
	POST_ENTIDADE,
	UPDATE_ENTIDADE,
	UPDATE_USER,
	UPDATE_SENHA_USER,
	DELETE_ENTIDADE,
	LOGIN_USER,
	VALIDATE_TOKEN,
	GETBYNOME,
	CHECK_CUPOM,
	filtrarPedidosDatas,
};
