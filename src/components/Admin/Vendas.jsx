/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import Loading from "../Loading";
import { confirmarPedidoBackend, despacharProdutosBackend, confirmarEntregaBackend, autorizarTrocaBackend, confirmarRecebimentoBackend } from "../../api";
import Erro from '../Erro';

function Vendas() {
  const { listarEntidades, pedidos, setPedidos, erro, setErro, loading, setLoading, criarEntidade, atualizarEntidade, cupomValidado } = useContext(AppContext);
  const [filtroStatus, setFiltroStatus] = useState("all");
  const [filteredPedidos, setFilteredPedidos] = useState([]);

   useEffect(() => {
    const fetchData = async () => {
      await listarEntidades("pedidos");
    }
    fetchData();
  }, [setPedidos]);
  
  useEffect(() => {
    if (pedidos) {
      const pedidosFiltrados = pedidos.filter((pedido) => {
        if (filtroStatus === "all") {
          return true;
        }
        return pedido.status === filtroStatus;
      });  
      setFilteredPedidos(pedidosFiltrados);
    }
  }, [listarEntidades, filtroStatus]);

  async function handleConfirmarPedido(vendaId, statusAtual) {
      await confirmarPedidoBackend(vendaId, {status: statusAtual});
      const novosDadosPedidos = pedidos.map(async pedido => {
        if (pedido.id === vendaId) {
          if (statusAtual === 'confirmado') return { ...pedido, status: 'PAGAMENTO REALIZADO' };
          if (statusAtual === 'recusado') return { ...pedido, status: 'PAGAMENTO RECUSADO' };
          if (statusAtual === 'cancelado') {
            if (cupomValidado) await atualizarEntidade(cupomValidado.id, {ativo: true}, "cupom")
            return { ...pedido, status: 'PEDIDO CANCELADO' };
          }
        }
        return pedido;
      });
      setPedidos(novosDadosPedidos);
  }

  async function handleDespacharProdutos(vendaId) {
    try {
      await despacharProdutosBackend(vendaId);
      const novosDadosPedidos = pedidos.map(pedido => {
        if (pedido.id === vendaId) {
          return { ...pedido, status: 'EM TRANSPORTE' };
        }
        return pedido;
      });
      setPedidos(novosDadosPedidos);
    } catch (error) {
      console.error('Erro ao despachar produtos:', error);
    }
  }

  async function handleConfirmarEntrega(vendaId) {
    try {
      await confirmarEntregaBackend(vendaId);
      const novosDadosPedidos = pedidos.map(pedido => {
        if (pedido.id === vendaId) {
          return { ...pedido, status: 'ENTREGUE' };
        }
        return pedido;
      });
      setPedidos(novosDadosPedidos);
    } catch (error) {
      console.error('Erro ao confirmar entrega:', error);
    }
  }

  async function handleAutorizarTroca(vendaId) {
    try {
      setErro(null);
      setLoading(true);

      await autorizarTrocaBackend(vendaId);
      const novosDadosPedidos = pedidos.map(pedido => {
        if (pedido.id === vendaId && pedido.status.toLocaleUpperCase() === 'EM TROCA') {
          return { ...pedido, status: 'TROCA AUTORIZADA' };
        }
        return pedido;
      });
      setPedidos(novosDadosPedidos);
    } catch (error) {
      console.error('Erro ao autorizar troca:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmarRecebimento(vendaId, valorVenda, vendaClienteId) {
    try {
      setErro(null);
      setLoading(true);

      const geraCupomTroca = await criarEntidade({
        nome: `TROCA${vendaId}`,
        valor: valorVenda,
        tipo: "TROCA",
        ativo: true,
        cliente_id: vendaClienteId,
        pedido_id: vendaId
      }, "cupom")

      if (geraCupomTroca) {
        await confirmarRecebimentoBackend(vendaId, geraCupomTroca);
        const novosDadosPedidos = pedidos.map(pedido => {
          if (pedido.id === vendaId && pedido.status.toLocaleUpperCase() === 'TROCA AUTORIZADA') {
            return { ...pedido, status: 'TROCA FINALIZADA' };
          }
          return pedido;
        });
        setPedidos(novosDadosPedidos);

        const confirmacao = window.confirm("Deseja retornar os itens devolvidos ao estoque?");
        if (confirmacao) {
          console.log('adicionar requisição para atualizar a entidade Livros')
          // atualizarEntidade(book.id, {quantidade: parseInt(novaQuantidade.value)}, "livros")
        }
      }


    } catch (error) {
      console.error('Erro ao confirmar recebimento do produto:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading/>
  return (
    <div className="border-b border-gray-200 py-4 text-gray-600 flex flex-col flex-grow">
      <div className="justify-between items-center mb-4 flex gap-2">
        <div>
          <h3 className="text-2xl font-medium tracking-tight">Vendas</h3>
          <h4 className="text-lg font-medium mb-2">consultar e gerenciar</h4>  
        </div>

      <div>
        <label>Filtrar por status </label>
        <select
          id="filtroStatus"
          value={filtroStatus}
          onChange={(event) => setFiltroStatus(event.target.value)}
          className="text-gray-800 w-80 rounded-md shadow-md shadow-slate-200 border-zinc-400"
        >
          <option value="all">Todos</option>
          <option value="EM PROCESSAMENTO">EM PROCESSAMENTO</option>
          <option value="EM TRANSPORTE">EM TRANSPORTE</option>
          <option value="ENTREGUE">ENTREGUE</option>
          <option value="EM TROCA">EM TROCA</option>
          <option value="TROCA AUTORIZADA">TROCA AUTORIZADA</option>
        </select>
      </div>
      </div>

      <table className="w-full table-auto mb-6 text-center">
        <thead>
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Data da compra</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Produtos</th>
            <th className="px-4 py-2">Quantidade</th>
            <th className="px-4 py-2">Forma de pagamento</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos && filteredPedidos && filteredPedidos.map((venda) => (
            <tr key={venda.id} className="border-2 rounded-md p-4 m-2">
              <td className="border px-4 py-2">{venda.id}</td>
              <td className="border px-4 py-2">{venda.dataCompra}</td>
              <td className="border px-4 py-2">R${venda.valor}</td>
              <td className="border px-4 py-2">
              {venda.tituloLivro.split(',').map((item) => (
                <div key={item} className="border-b-2 px-4 py-2 border-gray-400">
                  <p>{item}</p>
                  <span className="text-sm">Capa Original </span>
                </div>
               ))} 
              </td>
              <td className="border px-4 py-2">{venda.quantidade}</td>
              <td className="border px-4 py-2">{venda.formaPagamento} <span>Número: {venda.numeroCartao}</span></td>
              <td className="border px-4 py-2 text-blue-600 font-medium uppercase">
                {venda.status}
              </td>
              <td className="border px-4 py-2">
                {venda.status.toLocaleUpperCase() === 'EM PROCESSAMENTO' && (
                  <>
                  <button className="text-blue-500 rounded" onClick={() => handleConfirmarPedido(venda.id, 'confirmado')}>
                    Confirmar pagamento
                  </button>
                   <button className="text-blue-500 rounded" onClick={() => handleConfirmarPedido(venda.id, 'recusado')}>
                    Recusar pagamento
                  </button>
                  <button className="text-blue-500 rounded" onClick={() => handleConfirmarPedido(venda.id, 'cancelado')}>
                    Cancelar pedido
                  </button>
                  </>
                )}
                {venda.status.toLocaleUpperCase() === 'PAGAMENTO REALIZADO' && (
                  <button className="text-blue-500 rounded" onClick={() => handleDespacharProdutos(venda.id)}>
                    Enviar produto
                  </button>
                )}
                {venda.status.toLocaleUpperCase() === 'EM TRANSPORTE' && (
                  <button className="text-blue-500 rounded" onClick={() => handleConfirmarEntrega(venda.id)}>
                    Confirmar entrega
                  </button>
                )}
                {venda.status.toLocaleUpperCase() === 'EM TROCA' && (
                  <button className="text-blue-500 rounded" onClick={() => handleAutorizarTroca(venda.id)}>
                    Autorizar troca
                  </button>
                )}
                {venda.status.toLocaleUpperCase() === 'TROCA AUTORIZADA' && (
                  <button className="text-blue-500 rounded" onClick={() => handleConfirmarRecebimento(venda.id, venda.valor, venda.cliente_id)}>
                    Confirmar recebimento pedido
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <Erro erro={erro}/>
      </table>


    </div>
  )
}

export default Vendas;