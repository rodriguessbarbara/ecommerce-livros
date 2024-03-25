import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import CarrinhoItem from "../Carrinho/CarrinhoItem";

function CompraOverview() {
  const navigate = useNavigate();

  const { carrinhoItens, precoTotal, setIsCarrinhoAtivo } = useContext(AppContext);

  return (
    <div className="min-h-screen max-w-7xl mx-auto pb-24 flex flex-col text-gray-800 mt-16">
      <h2 className="text-2xl font-medium text-gray-800 pt-5">
          Carrinho de compras
        </h2>

      <div className="my-6 flex flex-col px-6 py-12 gap-10 bg-gray-100 rounded-md">
        {carrinhoItens.map((item) =>
          <CarrinhoItem key={item.id} data={item} />
        )}
      </div>

      <p className="font-bold text-lg text-gray-800 text-end">
        Preço Total: R$ {precoTotal}
      </p>

      <button onClick={() => {
        setIsCarrinhoAtivo(false)
        navigate("/conta/finalizar-compra")
      }}
        className="rounded-md self-end bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 mt-2">
        Finalizar compra
      </button>
    </div>
  )
}

export default CompraOverview;