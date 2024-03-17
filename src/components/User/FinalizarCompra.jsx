import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const infos = [
  {
    id: 'endereço',
    name: 'endereço de entrega',
    options: [
      { value: 'intriseca', label: 'intriseca', checked: false },
      { value: 'rocco', label: 'rocco', checked: false },
    ],
  },
  {
    id: 'pagamento',
    name: 'Método de pagamento',
    options: [
      { value: 'romance', label: 'romance', checked: false },
      { value: 'drama', label: 'drama', checked: false },
    ],
  },
  {
    id: 'Cupom',
    name: 'Cupom',
    options: [
      { value: 'Blake Crouch', label: 'Blake Crouch', checked: false },
    ],
  },
]

function FinalizarCompra() {
  const navigate = useNavigate();

  const { precoTotal } = useContext(AppContext);

  return (
    <div className="min-h-screen sm:max-w-6xl mx-auto pb-24 flex flex-col text-gray-800 sm:mt-24">
        <h2 className="text-2xl font-medium text-gray-800 pt-5 pb-8">
            Finalizar a Compra
        </h2>
      
      <div className="flex flex-col gap-6">
        {infos.map((info) => (
          <div key={info.id} className="flex justify-between mb-2 pb-6 border-b-2 border-gray-300">
            <h3 className="font-medium text-gray-800">{info.name}</h3>
            <p>pipippipopooo</p>
            <a>Alterar</a>
        </div>
      ))}
      </div>  
        
      <p className="font-bold text-lg text-gray-800 text-end">
            Preço Total: R$ {precoTotal}
      </p>

      <button onClick={() => {
            navigate("/compra/compra-efetuada")
          }}
            className="rounded-md self-end bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 mt-2">
            Confirmar compra
          </button>
    </div>
  )
}

export default FinalizarCompra;