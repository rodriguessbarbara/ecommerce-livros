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

//Pedidos - STATUS
async function confirmarPedidoBackend(vendaId, statusAtual) {
	try {
		const response = await API.patch(
			`/pedidos/confirmar/${vendaId}`,
			statusAtual,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Erro ao confirmar pedido:", error);
	}
}

async function despacharProdutosBackend(vendaId) {
	try {
		const response = await API.patch(`/pedidos/despachar/${vendaId}`);
		return response.data;
	} catch (error) {
		console.error("Erro ao despachar produtos:", error);
	}
}

async function confirmarEntregaBackend(vendaId) {
	try {
		const response = await API.patch(`/pedidos/confirmar-entrega/${vendaId}`);
		return response.data;
	} catch (error) {
		console.error("Erro ao confirmar entrega:", error);
	}
}

async function autorizarTrocaBackend(vendaId) {
	try {
		const response = await API.patch(`/pedidos/autorizar-troca/${vendaId}`);
		return response.data;
	} catch (error) {
		console.error("Erro ao autorizar troca:", error);
	}
}

async function solicitarTrocaBackend(vendaId) {
	try {
		const response = await API.patch(`/pedidos/solicitar-troca/${vendaId}`);
		return response.data;
	} catch (error) {
		console.error("Erro ao solicitar troca:", error);
	}
}

async function confirmarRecebimentoBackend(vendaId) {
	try {
		const response = await API.patch(
			`/pedidos/confirmar-recebimento/${vendaId}`
		);
		return response.data;
	} catch (error) {
		console.error("Erro ao solicitar troca:", error);
	}
}

export {
	GETALL_ENTIDADE,
	GET_USER,
	POST_ENTIDADE,
	UPDATE_ENTIDADE,
	DELETE_ENTIDADE,
	CHECK_USER,
	GETBYNOME_LIVRO,
	CHECK_CUPOM,
	confirmarPedidoBackend,
	despacharProdutosBackend,
	confirmarEntregaBackend,
	autorizarTrocaBackend,
	solicitarTrocaBackend,
	confirmarRecebimentoBackend,
};
