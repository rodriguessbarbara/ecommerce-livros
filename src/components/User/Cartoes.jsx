import { useContext, useEffect, useState } from "react";
import AlterarCartao from "./AlterarCartao";
import AppContext from "../../context/AppContext";
import AdicionarCartao from "./AdicionarCartao";

const prevCartoes = [
  { id: 1, bandeira: 'Visa', final: 3210, nome: 'Jose R Almeida', preferencial: true },
  { id: 2, bandeira: 'Mastercard', final: 9902, nome: 'Robso Silva', preferencial: false },
  //{ id: 3, bandeira: 'Mastercard', final: 2157, nome: 'Amanda Santos', preferencial: false },
]

function Cartoes() {
  const [openAlterarCartao, setOpenAlterarCartao] = useState(false);
  const [openAdicionarCartao, setOpenAdicionarCartao] = useState(false);

  const [ cartao, setCartao ] = useState({});
  const { cartoes, setCartoes } = useContext(AppContext);

  useEffect(() => {
    setCartoes(prevCartoes);
  }, [setCartoes]);

  return (
    <div>
      <div className="flex flex-col gap-2 border-b border-gray-300 pt-4 pb-2 mb-10">
        <h3 className="text-2xl font-medium tracking-tight text-gray-800">Formas de Pagamento</h3>
        <h4 className="text-lg font-medium text-gray-600">Cartões</h4>
      </div>

      <div className="flex flex-col gap-2">
        {cartoes.map((item) => (
          <div key={item.id} className="py-4 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-md px-4 border-2 border-gray-400 text-gray-600" onClick={() => {
            setCartao(item)
            setOpenAlterarCartao(true)
          }
          }>
            <h4 className="font-semibold text-lg">{item.bandeira}</h4>
            <p>Cartão com final <span className="font-bold">{item.final}</span></p>
                <p>{item.nome}</p>
              {item.preferencial && <p className="text-green-700 text-sm">*Preferencial</p>}
          </div>
        ))}

        <AlterarCartao isOpenAlterarCartao={openAlterarCartao} setIsOpenAlterarCartao={() => setOpenAlterarCartao(!openAlterarCartao)} cartao={cartao}/>

        <button className="pt-8 pb-6 text-blue-800" onClick={() => setOpenAdicionarCartao(true)}>
          Adicione um método de pagamento
        </button>

        <AdicionarCartao openAdicionarCartao={openAdicionarCartao} setOpenAdicionarCartao={() => setOpenAdicionarCartao(!openAdicionarCartao)}/>
      </div>
    </div>
  )
}

export default Cartoes