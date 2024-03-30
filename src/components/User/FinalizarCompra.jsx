import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import Input from "../Input";

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
]

function FinalizarCompra() {
  const { precoTotal, dadosCliente, atualizarDadosCliente } = useContext(AppContext);

  const navigate = useNavigate();
  const [editar, setEditar] = useState(null);
  const [infosState, setInfosState] = useState(infos.map(info => ({ id: info.id, info: info.defaultInfo })));

  const handleSave = (id, newValue) => {
    const newInfosState = infosState.map(info => {
      if (info.id === id) {
        return { ...info, info: newValue };
      }
      return info;
    });
    setInfosState(newInfosState);
    setEditar(null);
  };

  //falta ajustar:
    //arrumar o onChange dos input
    //armazenar os valor dos input em algum lugar e
    //atualizar o dadosCliente.pedidos com o novo pedido realizado
    //depois de tudo isso, aparfecer um modal de confirmação e
    //quando o usuario clicar 'OK' nesse modal, navegar para a pagina de Perfil do usuário

  return (
    <div className="min-h-screen max-w-7xl mx-auto text-gray-800 mt-16 px-4">
        <h2 className="text-2xl font-medium text-gray-800 pt-5">
            Finalizar a Compra
        </h2>
        
        <div className="my-4 flex flex-col gap-6">

          {infosState.map(({ id, info }) => (
            <div key={id} className="rounded-md bg-gray-100 px-6 py-10 border-gray-300">
              <h3 className="font-medium text-gray-800 text-lg mb-2">{infos.find(item => item.id === id).name}</h3>
              {editar === id ? (
                <div>
                  <Input type="text" value={info} onChange={(e) => handleSave(id, e.target.value)} />
                  <button onClick={() => handleSave(id, info)}>Salvar</button>
                </div>
              ) : (
                <>
                  <p>{info}</p>
                  <a className="cursor-pointer text-blue-800 font-medium" onClick={() => setEditar(id)}>Alterar</a>
                </>
              )}
            </div>
          ))}
        </div> 

      <div className="self-end text-end">
        <p className="font-bold text-lg text-gray-800">
              Preço Total: R$ {precoTotal}
        </p>

        <button onClick={() => {
          navigate("/conta/compra-efetuada")
        }}
          className="rounded-md self-end bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 mt-2">
          Confirmar compra
        </button>
      </div>
      
    </div>
  )
}

export default FinalizarCompra;