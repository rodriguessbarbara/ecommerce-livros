import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";

/* eslint-disable react/prop-types */
function CarrinhoItem({ data }) {

  const { id, imageSrc, capaAlternativa, titulo, precificacao } = data;
  const { carrinhoItens, setCarrinhoItens, isCapaAlternativa } = useContext(AppContext);
  const [numQtd, setNumQtd] = useState(1);

  function handleRemoveItem() {
    const updatedItens = carrinhoItens.filter((item) => item.id != id);
    setCarrinhoItens(updatedItens);
  }

  return (
    <>
      <section className="flex flex-start border-b-2 border-gray-300 pb-5 mb-2 relative">
        <div className="border-2 border-gray-200 rounded-lg">
          <img src={isCapaAlternativa.includes(id) ? `${capaAlternativa}` : `${imageSrc}`}
          alt="Imagem do livro"
          className="p-2 max-w-16 w-full h-full"/>
          
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <a href="">{titulo}</a>
              </h3>
              <p className="ml-4">R${precificacao}</p>
            </div>
            <p className="mb-2 text-sm text-gray-500">capa Original</p>
          </div>
          
          <div className="flex flex-1 gap-8 text-sm">
            <p className="text-gray-600 font-medium self-center">Qtd: {numQtd}</p>
            
            <button className="text-gray-600 font-bold cursor-pointer text-base" onClick={() => {
                if(numQtd > 1) setNumQtd(numQtd - 1)}
              }>
                -
              </button>
              
              <button className="text-gray-600 font-bold cursor-pointer text-base" onClick={() => setNumQtd(numQtd + 1)}>
                +
              </button>
          </div>
          
            <div className="flex justify-end text-sm">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={handleRemoveItem}
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