import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";

function Vendas() {
  const { dadosMock, atualizarDadosMock } = useContext(AppContext);
  const [filtroStatus, setFiltroStatus] = useState("all");
  const [filteredPedidos, setFilteredPedidos] = useState([]);

  const handleFiltroChange = (event) => {
    setFiltroStatus(event.target.value);
  };

  useEffect(() => {
    const pedidosFiltrados = dadosMock.pedidos.filter((pedido) => {
      if (filtroStatus === "all") {
        return true;
      }
      return pedido.status === filtroStatus;
    });
    setFilteredPedidos(pedidosFiltrados);
  }, [dadosMock.pedidos, filtroStatus]);


  function despacharProdutos(vendaId) {
    const novosDadosPedidos = dadosMock.pedidos.map(pedido => {
      if (pedido.id === vendaId) {
        return { ...pedido, status: 'EM TRÂNSITO' };
      }
      return pedido;
    });

    atualizarDadosMock({ ...dadosMock, pedidos: novosDadosPedidos });
  }

  function confirmarEntrega(vendaId) {
    const novosDadosPedidos = dadosMock.pedidos.map(pedido => {
      if (pedido.id === vendaId) {
        return { ...pedido, status: 'ENTREGUE' };
      }
      return pedido;
    });

    atualizarDadosMock({ ...dadosMock, pedidos: novosDadosPedidos });
  }

  function autorizarTroca(vendaId) {
    const novosDadosPedidos = dadosMock.pedidos.map(pedido => {
      if (pedido.id === vendaId && pedido.status.toLocaleUpperCase() === 'EM TROCA') {
        return { ...pedido, status: 'TROCA AUTORIZADA' };
      }
      return pedido;
    });

    atualizarDadosMock({ ...dadosMock, pedidos: novosDadosPedidos });
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

      <table className="w-full table-auto mb-6 text-center">
        <thead>
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Data da compra</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Produtos</th>
            <th className="px-4 py-2">Forma de pagamento</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredPedidos.map((venda) => (
            <tr key={venda.id} className="border-2 rounded-md p-4 m-2">
              <td className="border px-4 py-2">{venda.id}</td>
              <td className="border px-4 py-2">{venda.dataCompra}</td>
              <td className="border px-4 py-2">R${venda.valor}</td>
              <td className="border px-4 py-2">
                {typeof venda.livro != "string" ? (
                  venda.livro.map((item, index) => (
                    <div key={index} className="border rounded-md px-4 py-2 bg-gray-100 border-gray-300">
                      <p >{item}</p>
                      <span className="text-sm">Capa Original</span>
                    </div>
                  ))
                ) : (
                  <div className="border rounded-md px-4 py-2 bg-gray-100 border-gray-300 ">
                    <p className="flex gap-8">{venda.livro}</p>
                    <span className="text-sm">Capa Original</span>
                  </div>
                )}
              </td>
              <td className="border px-4 py-2">{venda.formaPagamento} <span>Número: {venda.numeroCartao}</span></td>
              <td className="border px-4 py-2 text-blue-600 font-medium uppercase">
                {venda.status.toLocaleUpperCase() === 'EM PROCESSAMENTO' ? 'Em processamento' : venda.status}
              </td>
              <td className="border px-4 py-2">
                {venda.status.toLocaleUpperCase() === 'EM PROCESSAMENTO' && (
                  <button className="text-blue-500 rounded" onClick={() => despacharProdutos(venda.id)}>
                    Despachar produtos para entrega
                  </button>
                )}
                {venda.status.toLocaleUpperCase() === 'EM TRÂNSITO' && (
                  <button className="text-blue-500 rounded" onClick={() => confirmarEntrega(venda.id)}>
                    Confirmar entrega
                  </button>
                )}
                {venda.status.toLocaleUpperCase() === 'EM TROCA' && (
                  <button className="text-blue-500 rounded" onClick={() => autorizarTroca(venda.id)}>
                    Autorizar troca
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Vendas;