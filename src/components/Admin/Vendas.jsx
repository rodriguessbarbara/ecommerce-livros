import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";

function Vendas() {
  const { dadosCliente, atualizarDadosCliente } = useContext(AppContext);
  const [filtroStatus, setFiltroStatus] = useState("all");
  const [filteredPedidos, setFilteredPedidos] = useState([]);

  const handleFiltroChange = (event) => {
    setFiltroStatus(event.target.value);
  };

  useEffect(() => {
    const pedidosFiltrados = dadosCliente.pedidos.filter((pedido) => {
      if (filtroStatus === "all") {
        return true;
      }
      return pedido.status === filtroStatus;
    });
    setFilteredPedidos(pedidosFiltrados);
  }, [dadosCliente.pedidos, filtroStatus]);


  function despacharProdutos(vendaId) {
    const novosDadosPedidos = dadosCliente.pedidos.map(pedido => {
      if (pedido.id === vendaId) {
        return { ...pedido, status: 'EM TRÂNSITO' };
      }
      return pedido;
    });

    atualizarDadosCliente({ ...dadosCliente, pedidos: novosDadosPedidos });
  }

  function confirmarEntrega(vendaId) {
    const novosDadosPedidos = dadosCliente.pedidos.map(pedido => {
      if (pedido.id === vendaId) {
        return { ...pedido, status: 'ENTREGUE' };
      }
      return pedido;
    });

    atualizarDadosCliente({ ...dadosCliente, pedidos: novosDadosPedidos });
  }

  function autorizarTroca(vendaId) {
    const novosDadosPedidos = dadosCliente.pedidos.map(pedido => {
      if (pedido.id === vendaId && pedido.status.toLocaleUpperCase() === 'EM TROCA') {
        return { ...pedido, status: 'TROCA AUTORIZADA' };
      }
      return pedido;
    });

    atualizarDadosCliente({ ...dadosCliente, pedidos: novosDadosPedidos });
  }

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
          onChange={handleFiltroChange}
          className="text-gray-800 w-80 rounded-md shadow-md shadow-slate-200 border-zinc-400"
        >
          <option value="all">Todos</option>
          <option value="EM PROCESSAMENTO">EM PROCESSAMENTO</option>
          <option value="EM TRÂNSITO">EM TRÂNSITO</option>
          <option value="ENTREGUE">ENTREGUE</option>
          <option value="EM TROCA">EM TROCA</option>
          <option value="TROCA AUTORIZADA">TROCA AUTORIZADA</option>
        </select>
      </div>
      </div>

      {filteredPedidos.map((venda) => (
         <div key={venda.id} className="rounded-md border-2 border-gray-300 mb-6">
         <div className="border-b-2 border-gray-400 bg-gray-300 p-4 font-light flex gap-8">
           <p>venda realizado em <span className="font-normal">{venda.dataCompra}</span></p>
           <p>Total: <span className="font-normal">R${venda.valor}</span> </p>
           <p>venda n.: <span className="font-normal">{venda.id}</span></p>
         </div>

         <div className="px-4 py-4">
             {typeof venda.livro != "string" ? (
               venda.livro.map((item) => (
                 <div key={item} className="mb-4 border-2 rounded-md p-4 bg-gray-200 border-gray-300">
                   <p >{item} </p>
                   <span className="text-sm">Capa Original </span>
                 </div>
               ))
               ) : (
                 <div className="mb-4 border-2 rounded-md p-4 bg-gray-200 border-gray-300 ">
                   <p className="flex gap-8">{venda.livro} </p>
                   <span className="text-sm">Capa Original </span>
                 </div>
                 )
             }

           <p>{venda.formaPagamento}<span> número: {venda.numeroCartao}</span></p>
           <p className="text-blue-600 font-medium uppercase">{venda.status}</p>
         </div>

         {venda.status.toLocaleUpperCase() === 'EM PROCESSAMENTO' && (
            <button className="mx-4 mb-4 text-blue-500 rounded" onClick={() => despacharProdutos(venda.id)}>
              Despachar produtos para entrega
            </button>
          )}

         {venda.status.toLocaleUpperCase() === 'EM TRÂNSITO' && (
            <button className="mx-4 mb-4 text-blue-500 rounded" onClick={() => confirmarEntrega(venda.id)}>
              Confirmar entrega
            </button>
          )}

         {venda.status.toLocaleUpperCase() === 'EM TROCA' && (
            <button className="mx-4 mb-4 text-blue-500 rounded" onClick={() => autorizarTroca(venda.id)}>
              Autorizar troca
            </button>
          )}
       </div>

      ))}
    </div>

  )
}

export default Vendas;