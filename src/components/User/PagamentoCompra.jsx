import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import MsgCompraEfetuada from "./MsgCompraEfetuada";
import AdicionarCartao from "./AdicionarCartao";
import { useLocation } from 'react-router-dom';

function PagamentoCompra() {
  const { carrinhoItens, setCarrinhoItens, dadosCliente, atualizarDadosCliente } = useContext(AppContext);

  const location = useLocation();
  const { precoEFrete } = location.state || {};
  const [openModal, setOpenModal] = useState(false);
  const [cartaoData, setCartaoData] = useState([]);
  const [cartaoSelecionado, setCartaoSelecionado] = useState([]);
  const [openAdicionarCartao, setOpenAdicionarCartao] = useState(false);

  useEffect(() => {
    if (dadosCliente) {
      setCartaoData(dadosCliente.cartoes);
    }
  }, [dadosCliente]);

  const handleConfirm = (event) => {
    event.preventDefault();

    const dataCompra = new Date().toLocaleDateString("pt-BR");
    const novoPedido = {
      id: 3,
      livro: carrinhoItens.map((item) => (item.titulo)),
      formaPagamento: "cartao",
      numeroCartao: cartaoSelecionado.numero,
      valor: precoEFrete,
      dataCompra: dataCompra,
      status: "em processamento"
    };

    atualizarDadosCliente({ pedidos: [...dadosCliente.pedidos, novoPedido] });
    setCarrinhoItens([]);
    setOpenModal(true);
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto text-gray-800 mt-16 px-4">
        <h2 className="text-2xl font-medium text-gray-800 pt-5">
            Finalizar a Compra
        </h2>
        
        <div className="my-4 flex flex-col gap-6">
          {cartaoData.map((cartao) => (
            <div key={cartao.id} className="rounded-md bg-gray-100 px-6 py-10 border-gray-300">

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={cartao === cartaoSelecionado}
                onChange={() => setCartaoSelecionado(cartao)}
                className="rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
              />
              <span className="ml-2 font-medium text-gray-800 text-lg">
                Bandeira {cartao.bandeira}
              </span>
            </label>

            <p className="text-gray-800">Cartão com final <span className="font-medium">{cartao.final}</span></p>
            <p className="text-gray-800">{cartao.nome}</p>
            </div>
          ))}
        </div> 
        
      <button className="pb-6 text-blue-800" onClick={() => setOpenAdicionarCartao(true)}>
          Adicione um novo cartão
      </button>

      <AdicionarCartao openAdicionarCartao={openAdicionarCartao} setOpenAdicionarCartao={() => setOpenAdicionarCartao(!openAdicionarCartao)}/>

      <div className="self-end text-end">
        <p className="font-bold text-lg text-gray-800">
              Preço Total: R$ {precoEFrete}
        </p>

        <button onClick={handleConfirm}
          className="rounded-md self-end bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 mt-2">
          Confirmar compra
        </button>
      </div>
      
      <MsgCompraEfetuada isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}/>
    </div>
  )
}

export default PagamentoCompra;