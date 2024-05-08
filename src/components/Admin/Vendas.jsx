/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import Loading from "../Loading";
import { confirmarPedidoBackend, despacharProdutosBackend, confirmarEntregaBackend, autorizarTrocaBackend, confirmarRecebimentoBackend, recusarTrocaBackend, cancelarPedidoBackend, recusarPedidoBackend } from "../../api";
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
  }, [setPedidos, pedidos, filtroStatus]);

  
  async function handleConfirmarPedido(vendaId) {
    try {
      setErro(null);
      setLoading(true);

      await confirmarPedidoBackend(vendaId);
      const novosDadosPedidos = pedidos.map(pedido => {
        if (pedido.id === vendaId) {
          return { ...pedido, status: 'PAGAMENTO REALIZADO' };
        }
        return pedido;
      });
      setPedidos(novosDadosPedidos);
    } catch (error) {
      console.error('Erro ao confirmar produtos:', error);
    } finally {
      setLoading(false);
    } 
  }

  async function handleRecusarPedido(vendaId) {
    try {
      setErro(null);
      setLoading(true);

      await recusarPedidoBackend(vendaId);
      const novosDadosPedidos = pedidos.map(pedido => {
        if (pedido.id === vendaId) {
          return { ...pedido, status: 'PAGAMENTO RECUSADO' };
        }
        return pedido;
      });
      setPedidos(novosDadosPedidos);
    } catch (error) {
      console.error('Erro ao confirmar produtos:', error);
    } finally {
      setLoading(false);
    } 
  }

  async function handleCancelarPedido(vendaId) {
    try {
      setErro(null);
      setLoading(true);

      await cancelarPedidoBackend(vendaId);
      const novosDadosPedidos = pedidos.map(pedido => {
        if (pedido.id === vendaId) {
          return { ...pedido, status: 'PEDIDO CANCELADO' };
        }
        return pedido;
      })
      if (cupomValidado) await atualizarEntidade(cupomValidado.id, {ativo: true}, "cupom");
        
      setPedidos(novosDadosPedidos);
    } catch (error) {
      console.error('Erro ao confirmar produtos:', error);
    } finally {
      setLoading(false);
    } 
  }

  async function handleDespacharProdutos(vendaId) {
    try {
      setErro(null);
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmarEntrega(vendaId) {
    try {
      setErro(null);
      setLoading(true);

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
    } finally {
      setLoading(false);
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

  async function handleRecusarTroca(vendaId) {
    try {
      setErro(null);
      setLoading(true);

      await recusarTrocaBackend(vendaId);
      const novosDadosPedidos = pedidos.map(pedido => {
        if (pedido.id === vendaId && pedido.status.toLocaleUpperCase() === 'EM TROCA') {
          return { ...pedido, status: 'TROCA RECUSADA' };
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
          if (pedido.id === vendaId && pedido.status.toLocaleUpperCase() === 'ITENS ENVIADOS') {
            return { ...pedido, status: 'TROCA FINALIZADA' };
          }
          return pedido;
        });
        
        const confirmacao = window.confirm("Deseja retornar os itens devolvidos ao estoque?");
        if (confirmacao) {
          console.log('temque adicionar requisição para atualizar a entidade Livros')
          // atualizarEntidade(book.id, {quantidade: parseInt(novaQuantidade.value)}, "livros")
        }
        setPedidos(novosDadosPedidos);
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
          <option value="PAGAMENTO REALIZADO">PAGAMENTO REALIZADO</option>
          <option value="PAGAMENTO RECUSADO">PAGAMENTO RECUSADO</option>
          <option value="PEDIDO CANCELADO">PEDIDO CANCELADO</option>
          <option value="EM TRANSPORTE">EM TRANSPORTE</option>
          <option value="ENTREGUE">ENTREGUE</option>
          <option value="EM TROCA">EM TROCA</option>
          <option value="TROCA AUTORIZADA">TROCA AUTORIZADA</option>
          <option value="TROCA RECUSADA">TROCA RECUSADA</option>
          <option value="TROCA FINALIZADA">TROCA FINALIZADA</option>
          <option value="ITENS ENVIADOS">ITENS ENVIADOS PARA TROCA</option>

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
              {venda.tituloLivro && typeof venda.tituloLivro === 'string' && (
                venda.tituloLivro.split(',').map((item) => (
                  <div key={item} className="border-b-2 px-4 py-2 border-gray-400">
                    <p>{item}</p>
                    <span className="text-sm">Capa Original </span>
                  </div>
                ))
              )}
              </td>
              <td className="border px-4 py-2">{venda.quantidade}</td>
              <td className="border px-4 py-2">{venda.formaPagamento} <span>Número: {venda.numeroCartao}</span></td>
              <td className="border px-4 py-2 text-blue-600 font-medium uppercase">
                {venda.status}
              </td>
              <td className="border px-4 py-2">
                {venda.status.toLocaleUpperCase() === 'EM PROCESSAMENTO' && (
                  <div className="flex flex-col gap-2">
                  <button className="text-blue-500 rounded" onClick={() => handleConfirmarPedido(venda.id)}>
                    Confirmar pagamento
                  </button>
                   <button className="text-blue-500 rounded" onClick={() => handleRecusarPedido(venda.id)}>
                    Recusar pagamento
                  </button>
                  <button className="text-blue-500 rounded" onClick={() => handleCancelarPedido(venda.id)}>
                    Cancelar pedido
                  </button>
                  </div>
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
                {venda.status.toLocaleUpperCase() === 'EM TROCA' && (
                  <button className="text-blue-500 rounded" onClick={() => handleRecusarTroca(venda.id)}>
                    Recusar troca
                  </button>
                )}
                {venda.status.toLocaleUpperCase() === 'ITENS ENVIADOS' && (
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