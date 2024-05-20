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
async function confirmarPedidoBackend(vendaId) {
	try {
		const response = await API.patch(`/pedidos/confirmar/${vendaId}`);
		return response.data;
	} catch (error) {
		console.error("Erro ao confirmar pedido:", error);
	}
}

async function recusarPedidoBackend(vendaId) {
	try {
		const response = await API.patch(`/pedidos/recusar/${vendaId}`);
		return response.data;
	} catch (error) {
		console.error("Erro ao recusar pagamento:", error);
	}
}

async function cancelarPedidoBackend(vendaId) {
	try {
		const response = await API.patch(`/pedidos/cancelar/${vendaId}`);
		return response.data;
	} catch (error) {
		console.error("Erro ao cancelar pedido:", error);
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

async function recusarTrocaBackend(vendaId) {
	try {
		const response = await API.patch(`/pedidos/recusar-troca/${vendaId}`);
		return response.data;
	} catch (error) {
		console.error("Erro ao recusar troca:", error);
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

async function solicitarTrocaItemBackend(vendaId, data) {
	try {
		const response = await API.patch(
			`/pedidos/solicitar-troca-item/${vendaId}`,
			data,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Erro ao solicitar troca do item:", error);
	}
}

async function enviarItensBackend(vendaId) {
	try {
		const response = await API.patch(`/pedidos/enviar-itens/${vendaId}`);
		return response.data;
	} catch (error) {
		console.error("Erro ao alterar status:", error);
	}
}

async function solicitarCancelamentoBackend(vendaId) {
	try {
		const response = await API.patch(
			`/pedidos/solicitar-cancelamento/${vendaId}`
		);
		return response.data;
	} catch (error) {
		console.error("Erro ao solicitar o cancelamento:", error);
	}
}

async function confirmarRecebimentoBackend(vendaId, dataCupom) {
	try {
		const response = await API.patch(
			`/pedidos/confirmar-recebimento/${vendaId}`,
			dataCupom,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Erro ao confirmar recebimento do produto:", error);
	}
}

async function retornarEstoque(vendaId, dataVenda) {
	const response = await API.patch(
		`/pedidos/retornar-estoque/${vendaId}`,
		dataVenda,
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	return response;
}

export {
	GETALL_ENTIDADE,
	GET_ENTIDADE,
	POST_ENTIDADE,
	UPDATE_ENTIDADE,
	DELETE_ENTIDADE,
	CHECK_USER,
	GETBYNOME_LIVRO,
	CHECK_CUPOM,
	confirmarPedidoBackend,
	recusarPedidoBackend,
	cancelarPedidoBackend,
	despacharProdutosBackend,
	confirmarEntregaBackend,
	autorizarTrocaBackend,
	recusarTrocaBackend,
	solicitarTrocaBackend,
	solicitarTrocaItemBackend,
	enviarItensBackend,
	solicitarCancelamentoBackend,
	confirmarRecebimentoBackend,
	retornarEstoque,
};
