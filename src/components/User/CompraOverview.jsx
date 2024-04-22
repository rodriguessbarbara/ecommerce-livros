import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import CarrinhoItem from "../Carrinho/CarrinhoItem";

function CompraOverview() { 
  const navigate = useNavigate();
  const { carrinhoItens, precoTotal } = useContext(AppContext);

  const handleProxTela = () => {
    navigate("/conta/endereco-compra");
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto pb-24 text-gray-800 mt-16 px-4">
      <h3 className="text-2xl font-medium text-gray-800 py-4">
          Carrinho de compras
      </h3>

      <div className="mb-6 flex flex-col px-6 py-12 gap-10 bg-gray-100 rounded-md">
        {carrinhoItens.map((item) =>
          <CarrinhoItem key={item.id} data={item} />
        )}
      </div>

      <div className="self-end text-end">
        <p className="font-bold text-lg text-gray-800">
              Subtotal: R$ {precoTotal}
        </p>

        {!carrinhoItens.length ? (
          <p className="text-red-600">Seu carrinho de compras está vazio</p>
        ) : (
          <button onClick={handleProxTela}
            className="rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
            Continuar
          </button>
        )}
      </div>

    </div>
  )
}

export default CompraOverview;