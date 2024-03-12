import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import CarrinhoItem from "../Carrinho/CarrinhoItem";

function CompraOverview() {
  const navigate = useNavigate();

  const { carrinhoItens, precoTotal, setIsCarrinhoAtivo } = useContext(AppContext);

  return (
    <div className="min-h-screen sm:max-w-6xl mx-auto pb-24 flex flex-col text-gray-800 sm:mt-24">
      <div className="bg-gray-100 rounded-sm px-10 py-4">
        <h2 className="text-2xl font-medium text-gray-800 pt-5 pb-8">
            Carrinho de compras
          </h2>
        {carrinhoItens.map((item) =>
          <CarrinhoItem key={item.id} data={item} />
        )}
        
        <div className="mt-6 flex flex-col">
          <p className="font-bold text-lg text-gray-800 text-end">
            Preço Total: R$ {precoTotal}
          </p>

          <button onClick={() => {
            setIsCarrinhoAtivo(false)
            navigate("/compra/finalizar")
          }}
            className="rounded-md self-end bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 mt-2">
            Finalizar compra
          </button>
        </div>
      </div>
  
    </div>
  )
}

export default CompraOverview;