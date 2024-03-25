import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const infos = [
  {
    id: 'endereço',
    name: 'Endereço de Entrega',
    defaultInfo: 'Rua Fictícia, 123 - Bairro Imaginário, Cidade dos Sonhos',
  },
  {
    id: 'pagamento',
    name: 'Método de Pagamento',
    defaultInfo: 'Número: 1234 5678 9012 3456, Bandeira: MasterCard, Nome no Cartão: João da Silva',
  },
  {
    id: 'Cupom',
    name: 'Cupom',
    defaultInfo: '15OFF',
  },
]

function FinalizarCompra() {
  const { precoTotal } = useContext(AppContext);

  const navigate = useNavigate();
  const [alterarId, setAlterarId] = useState(null);
  const [infosState, setInfosState] = useState(infos.map(info => ({ id: info.id, info: info.defaultInfo })));

  const handleAlterar = (id) => {
    setAlterarId(id);
  };

  const handleSave = (id, newValue) => {
    const newInfosState = infosState.map(info => {
      if (info.id === id) {
        return { ...info, info: newValue };
      }
      return info;
    });
    setInfosState(newInfosState);
    setAlterarId(null);
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto pb-24 flex flex-col text-gray-800 mt-16">
      <h2 className="text-2xl font-medium text-gray-800 pt-5">
          Finalizar a Compra
      </h2>
      
      <div className="my-6 flex flex-col px-6 py-12 pb gap-10 bg-gray-100 rounded-md">
        {infosState.map(({ id, info }) => (
          <div key={id} className="flex justify-between mb-2 pb-6 border-b-2 border-gray-300">
            <h3 className="font-medium text-gray-800">{infos.find(item => item.id === id).name}</h3>
            {alterarId === id ? (
              <div>
                <input type="text" value={info} onChange={(e) => handleSave(id, e.target.value)} />
                <button onClick={() => handleSave(id, info)}>Salvar</button>
              </div>
            ) : (
              <>
                <p>{info}</p>
                <a className="cursor-pointer text-blue-800" onClick={() => handleAlterar(id)}>Alterar</a>
              </>
            )}
          </div>
        ))}
      </div> 

      <p className="font-bold text-lg text-gray-800 text-end">
            Preço Total: R$ {precoTotal}
      </p>

      <button onClick={() => {
        navigate("/conta/compra-efetuada")
      }}
        className="rounded-md self-end bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 mt-2">
        Confirmar compra
      </button>
    </div>
  )
}

export default FinalizarCompra;