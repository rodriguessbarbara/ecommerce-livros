import { useContext } from "react"
import { useNavigate } from "react-router-dom";

import CarrinhoItem from "./CarrinhoItem"
import AppContext from "../../context/AppContext"
import '../../index.css'

function Carrinho() {
  const navigate = useNavigate();
  const { carrinhoItens, isCarrinhoAtivo, setIsCarrinhoAtivo, precoTotal } = useContext(AppContext);

  const handleProxTela = () => {
    setIsCarrinhoAtivo(false)
    navigate("/compra")
  };

  return (
    <div className={`bg-white w-full max-w-80 h-screen fixed top-0 right-0 px-4 flex flex-col space-between overflow-auto carrinho ${isCarrinhoAtivo ? 'carrinho--ativo' : ''} `}>
      
      <div className="flex content-between justify-between">
        <h2 className="text-lg font-medium text-gray-800 pt-5 pb-8">
          Carrinho de compras
        </h2>
        <button
        className="text-gray-400 font-medium"
        onClick={ () => setIsCarrinhoAtivo(false)}>
          X
        </button>
      </div>

      {carrinhoItens.map((item) =>
          <CarrinhoItem key={item.id} data={item} />
      )}

      <div className="py-6 font-medium">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>R${precoTotal.toFixed(2)}</p>
          </div>

          <div className="mt-6">
            {!carrinhoItens.length ? (
              <p className="text-red-600">seu carrinho de compras está vazio</p>
            ) : (
            <button onClick={handleProxTela}
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
              Continuar compra
            </button>
            )}
          </div>

          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          </div>
      </div>

    </div>
  )
}

export default Carrinho