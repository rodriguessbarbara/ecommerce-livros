/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import Loading from "../Loading";
import { solicitarTrocaBackend } from '../../api';
import Erro from '../Erro';

function Pedidos() {
  const { listarCliente, userId, setDadosCliente, dadosCliente, erro, setErro, loading, setLoading } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      await listarCliente(userId);
    }
    fetchData();
   }, [setDadosCliente])

  async function handleSolicitarTroca(vendaId) {
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
  }

  if (loading) return <Loading/>
  return (
    <div className="flex flex-col gap-2 border-b border-gray-200 py-4 text-gray-600">
      <h3 className="text-2xl font-medium tracking-tight text-gray-800">Seus Pedidos</h3>
      <h4 className="text-lg font-medium text-gray-600 mb-2">Todos</h4>
        
      {dadosCliente && dadosCliente.Pedidos && dadosCliente.Pedidos.map((pedido) => (
        <div key={pedido.id} className="rounded-md border-2 border-gray-300 mb-6">
          <div className="border-b-2 border-gray-400 bg-gray-300 p-4 font-light flex gap-8">
            <p>Pedido realizado em <span className="font-normal">{pedido.dataCompra}</span></p>
            <p>Total: <span className="font-normal">R${pedido.valor}</span> </p>
            <p>pedido n.: <span className="font-normal">{pedido.id}</span></p>
          </div>

          <div className="px-4 py-4">
            {pedido.tituloLivro.split(',').map((item) => (
              <div key={item} className="mb-4 border-2 rounded-md p-4 bg-gray-200 border-gray-300">
                <p>{item}</p>
                <span className="text-sm">Capa Original </span>
              </div>
            ))}          

            {/* {pedido.numeroCartao.length ? (
              pedido.numeroCartao.map((c, index) => (
                <p key={c.numeroCartao}>{pedido.formaPagamento}<span> número: {c} - {pedido.bandeira[index]} </span></p>
              ))

            ) : (
              <p>{pedido.formaPagamento}<span> número: {pedido.numeroCartao}</span></p>
            )} */}

            <p>Forma pagamento: {pedido.formaPagamento}</p>
            <p className="text-blue-600 font-medium uppercase">{pedido.status}</p>
          </div>

          {pedido.status.toLocaleUpperCase() == "ENTREGUE" && (
            <button className="mx-4 mb-4 text-blue-500 rounded" onClick={() => handleSolicitarTroca(pedido.id)}>
              solicitar troca
            </button>
          )}
        </div>
      ))}
      <Erro erro={erro}/>
    </div>
  )
}

export default Pedidos;