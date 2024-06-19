import { useContext } from "react";
import AppContext from "../../context/AppContext";

/* eslint-disable react/prop-types */
function CarrinhoItem({ data, handleRemoveItem }) {
  const { id, imagemCapa, titulo, precificacao } = data;
  const { carrinhoItens, setCarrinhoItens } = useContext(AppContext);

  const itemCarrinho = carrinhoItens.find(item => item.id === id);
  const quantidadeAtual = itemCarrinho ? itemCarrinho.quantidadeCarrinho : 0;

  function handleAlteraQuantidade(novaQuantidade) {
    if (novaQuantidade > 0 && novaQuantidade <= data.quantidade) {
      setCarrinhoItens(carrinhoItens.map(item =>
        item.id === id ? { ...item, quantidadeCarrinho: novaQuantidade } : item
      ));
    }
  }

  return (
    <>
      <section className="flex flex-start border-b-2 border-gray-300 pb-5 mb-2 relative">
        <div className="border-2 border-gray-200 rounded-lg">
          <img src={`${imagemCapa}`}
          alt="Imagem do livro"
          className="p-2 max-w-16 w-full h-full"/>
          
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <a href="">{titulo}</a>
              </h3>
              <p className="ml-4">R${(precificacao * data.quantidadeCarrinho).toFixed(2)}</p>
            </div>
            {/* <p className="mb-2 text-sm text-gray-500">capa Original</p> */}
          </div>
          
          <div className="flex flex-1 gap-8 text-sm">
            <p className="text-gray-600 font-medium self-center">Qtd: {quantidadeAtual}</p>
            
            <button className="text-gray-600 font-bold cursor-pointer text-base" onClick={() => handleAlteraQuantidade(quantidadeAtual - 1) }>
                -
              </button>
              
              <button className="text-gray-600 font-bold cursor-pointer text-base" onClick={() => handleAlteraQuantidade(quantidadeAtual + 1) }>
                +
              </button>
          </div>
          
          <div className="flex justify-end text-sm">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => handleRemoveItem(id, titulo)}
            >
              Remover
            </button>
          </div>

        </div>
      </section>
    </>
  )
}

export default CarrinhoItem