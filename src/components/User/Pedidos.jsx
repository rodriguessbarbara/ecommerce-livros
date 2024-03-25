import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";

function Pedidos() {
  const { dadosCliente } = useContext(AppContext);
  const [dadosPedidos, setDadosPedidos] = useState([]);

  useEffect(() => {
    if (dadosCliente && dadosCliente.pedidos) {
      setDadosPedidos(dadosCliente.pedidos);
    }
  }, [dadosCliente]);

  return (
    <div className="flex flex-col gap-2 border-b border-gray-200 py-4 text-gray-600">
      <h3 className="text-2xl font-medium tracking-tight text-gray-800">Seus Pedidos</h3>
      <h4 className="text-lg font-medium text-gray-600 mb-2">Todos</h4>
        
      {dadosPedidos.map((pedido) => (
        <div key={pedido.id} className="rounded-md border-2 border-gray-300 mb-6">
          <div className="border-b-2 border-gray-400 bg-gray-300 p-4 font-light flex gap-8">
            <p>Pedido realizado em <span className="font-normal">{pedido.dataCompra}</span></p>
            <p>Total: <span className="font-normal">R${pedido.valor}</span> </p>
            <p>pedido n.: <span className="font-normal">XXXX</span></p>
          </div>

          <div className="p-4">
            <p>{pedido.livro} </p>
            <span className="text-sm">Capa Original </span>
            <p>{pedido.formaPagamento}<span> número: {pedido.numeroCartao}</span></p>
            <p className="text-green-600 uppercase">{pedido.status}</p>
          </div>

          {pedido.status == "entregue" && (
            <button className="mx-4 mb-4 text-blue-500 rounded">
              solicitar troca
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

export default Pedidos;