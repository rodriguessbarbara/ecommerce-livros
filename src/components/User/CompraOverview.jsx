import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import CarrinhoItem from "../Carrinho/CarrinhoItem";

function CompraOverview() { 
  const navigate = useNavigate();
  const { carrinhoItens, precoTotal, setCarrinhoItens } = useContext(AppContext);
  const [mensagemRemovido, setMensagemRemovido] = useState("");
  const [itemRemovido, setItemRemovido] = useState(null);

  const handleProxTela = () => {
    navigate("/conta/endereco-compra");
  };

  const handleSetMensagemRemovido = (mensagem, item) => {
    setMensagemRemovido(mensagem);
    setItemRemovido(item);

    setTimeout(() => {
      setMensagemRemovido("");
      setItemRemovido(null);
    }, 5000);
  };
  const handleRemoveItem = (id, titulo) => {
    const itemRemovido = carrinhoItens.find(item => item.id === id);
    const updatedItens = carrinhoItens.filter(item => item.id !== id);
    setCarrinhoItens(updatedItens);

    handleSetMensagemRemovido(titulo, itemRemovido);
  };

  const handleDesfazerRemoved = () => {
    if (itemRemovido) {
      setCarrinhoItens([...carrinhoItens, itemRemovido]);
      setMensagemRemovido("");
      setItemRemovido(null);
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto pb-24 text-gray-800 mt-16 px-4">
      <h3 className="text-2xl font-medium text-gray-800 py-4">
          Carrinho de compras
      </h3>

      <div className="mb-6 flex flex-col px-6 py-12 gap-10 bg-gray-100 rounded-md">
        {carrinhoItens.map((item) =>
          <CarrinhoItem key={item.id} data={item} handleRemoveItem={handleRemoveItem}/>
        )}
      </div>

      {mensagemRemovido && (
        <div className="p-1">
          <p className="text-gray-700">Livro <span className="font-medium">{mensagemRemovido}</span> foi removido do carrinho</p>
          <button className="text-red-600 font-medium" onClick={() => handleDesfazerRemoved()}>desfazer</button>
        </div>
      )}

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