/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import Loading from "../Loading";
import { solicitarTrocaBackend, enviarItensBackend } from '../../api';
import Erro from '../Erro';
import { format } from 'date-fns';

function Pedidos() {
  const { listarEntidadeById, userId, setDadosCliente, dadosCliente, erro, setErro, loading, setLoading } = useContext(AppContext);  
  const [cupomTroca, setCupomTroca] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await listarEntidadeById(userId, "clientes");

      let allCupons = [];
      if (dadosCliente && dadosCliente.Pedidos) {
        dadosCliente.Pedidos.forEach(async (pedido) => {
          const cupons = await listarEntidadeById(pedido.id, "cupom");
          allCupons.push(...cupons);
          setCupomTroca(allCupons);
        });
      }
    }
    fetchData();
   }, [setDadosCliente])

  async function handleSolicitarTroca(vendaId) {
    try {
      setErro(null);
      setLoading(true);

      await solicitarTrocaBackend(vendaId);
      const updatedPedidos = dadosCliente.Pedidos.map(pedido => {
        if (pedido.id === vendaId && pedido.status.toLocaleUpperCase() === 'ENTREGUE') {
          return { ...pedido, status: 'EM TROCA' };
        }
        return pedido;
      });
      setDadosCliente({ ...dadosCliente, Pedidos: updatedPedidos });
    } catch (error) {
      console.error('Erro ao solicitar troca:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleEnviarItens(vendaId) {
    try {
      setErro(null);
      setLoading(true);

      await enviarItensBackend(vendaId);
      const updatedPedidos = dadosCliente.Pedidos.map(pedido => {
        if (pedido.id === vendaId && pedido.status.toLocaleUpperCase() === 'TROCA AUTORIZADA') {
          return { ...pedido, status: 'ITENS ENVIADOS' };
        }
        return pedido;
      });
      setDadosCliente({ ...dadosCliente, Pedidos: updatedPedidos });
    } catch (error) {
      console.error('Erro ao atualizar status para enviar itens:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading/>
  return (
    <div className="flex flex-col gap-2 border-b border-gray-200 py-4 text-gray-600">
      <h3 className="text-2xl font-medium tracking-tight text-gray-800">Seus Pedidos</h3>
      <h4 className="text-lg font-medium text-gray-600 mb-2">Todos</h4>
        
      {dadosCliente && dadosCliente.Pedidos && dadosCliente.Pedidos.map((pedido) => (
        <div key={pedido.id} className="rounded-md border-2 border-gray-300 mb-6">
          <div className="border-b-2 border-gray-400 bg-gray-300 p-4 font-light flex gap-8">
            <p>Pedido realizado em <span className="font-normal">{format(new Date(pedido.createdAt), 'dd/MM/yyyy')}</span></p>
            <p>Total: <span className="font-normal">R${pedido.valor}</span> </p>
            <p>pedido n.: <span className="font-normal">{pedido.id}</span></p>
          </div>

          <div className="px-4 py-4">
            {pedido.LivroPedidos.map((item, index) => (
              <div key={item.Livro.id} className="mb-4 border-2 rounded-md p-4 bg-gray-200 border-gray-300">
                <div className="flex justify-between">
                  <p>{item.Livro.titulo}</p>
                  <p>Qtd: {pedido.quantidade.split(',')[index]}</p>
                </div>
                <span className="text-sm">Capa Original </span>
              </div>
            ))}                       

            <p>Forma pagamento: {pedido.formaPagamento}</p>
            {pedido.Cartao_Pedidos.map((c) => (
                <p key={c.Cartao.numeroCartao}>Cartão <span> número: {c.Cartao.numeroCartao} - {c.Cartao.bandeira} </span></p>
            ))}
            <p className="text-blue-600 font-medium uppercase">{pedido.status}</p>

            {cupomTroca && cupomTroca.map((cupom) => cupom.pedido_id === pedido.id && (
              <p className="mt-6 font-medium border-2 rounded-lg p-3 bg-white" key={cupom.id}>
                  {cupom.ativo ? (
                      `Cupom de ${cupom.tipo.toLowerCase()} disponível: `
                  ) : (
                      'Cupom de troca já foi utilizado '
                  )}
                  <span className={`font-bold ${cupom.ativo ? `text-green-700` : `text-red-700`} `}>{cupom.nome}</span>
              </p>
            ))}
          </div>

          {pedido.status.toLocaleUpperCase() == "ENTREGUE" && (
            <button className="mx-4 mb-4 text-blue-500 rounded" onClick={() => handleSolicitarTroca(pedido.id)}>
              solicitar troca
            </button>
          )}
          {pedido.status.toLocaleUpperCase() == "TROCA AUTORIZADA" && (
            <button className="mx-4 mb-4 text-blue-500 rounded" onClick={() => handleEnviarItens(pedido.id)}>
              Enviar item(ns) para troca
            </button>
          )}
        </div>
      ))}
      <Erro erro={erro}/>
    </div>
  )
}

export default Pedidos;