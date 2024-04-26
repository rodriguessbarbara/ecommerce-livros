import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

async function POST_ENTIDADE(body, entidade) {
	const response = await API.post(`/${entidade}`, body, {
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
	const response = await API.get(`/${entidade}/`);
	return response;
}

async function GET_USER(userId) {
	const response = await API.get(`/clientes/${userId}`);
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
async function GETBYNOME_LIVRO(nome) {
	const response = await API.get(`/livros/nome/${nome}`);
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

//Pedidos
// async function CREATE_PEDIDO(id, newData, entidade) {
// 	const response = await API.patch(`/${entidade}/${id}/pedido`, newData, {
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	});
// 	return response;
// }

export {
	GETALL_ENTIDADE,
	GET_USER,
	POST_ENTIDADE,
	UPDATE_ENTIDADE,
	DELETE_ENTIDADE,
	CHECK_USER,
	GETBYNOME_LIVRO,
	CHECK_CUPOM,
};
