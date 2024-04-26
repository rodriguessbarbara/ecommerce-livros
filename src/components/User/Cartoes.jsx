import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import AlterarCartao from "./AlterarCartao";
import AdicionarCartao from "./AdicionarCartao";
import Loading from "../Loading";

function Cartoes() {
  const [openAlterarCartao, setOpenAlterarCartao] = useState(false);
  const [openAdicionarCartao, setOpenAdicionarCartao] = useState(false);
  const [cartao, setCartao] = useState([]);
  const { dadosCliente, listarCliente, userId, setDadosCliente, loading } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      await listarCliente(userId);
    }
    fetchData();
   }, [setDadosCliente])

  const handleOpenAlterarCartao = (item) => {
    setCartao(item);
    setOpenAlterarCartao(true);
  };

  console.log()

  if (loading) return <Loading/>
  return (
    <div>
      <div className="flex flex-col gap-2 border-b border-gray-300 pt-4 pb-2 mb-10">
        <h3 className="text-2xl font-medium tracking-tight text-gray-800">Formas de Pagamento</h3>
        <h4 className="text-lg font-medium text-gray-600">Cartões</h4>
      </div>

      <div className="flex flex-col gap-2">
        {dadosCliente.Cartaos && dadosCliente.Cartaos.map((cartao) => (
          <div key={cartao.id} className="py-4 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-md px-4 border-2 border-gray-400 text-gray-600" onClick={() => handleOpenAlterarCartao(cartao)}>
            <h4 className="font-semibold text-lg">{cartao.bandeira}</h4>
            <p>Cartão com final <span className="font-bold">{cartao.final}</span></p>
            <p>{cartao.nome}</p>
            <p className="text-gray-500 font-medium text-sm">
              {cartao.preferencial ? 'preferencial' : 'normal'}
            </p>               
          </div>
        ))}

        <AlterarCartao isOpenAlterarCartao={openAlterarCartao} setIsOpenAlterarCartao={() => setOpenAlterarCartao(!openAlterarCartao)} cartao={cartao}/>

        <button className="pt-8 pb-6 text-blue-800" onClick={() => setOpenAdicionarCartao(true)}>
          Adicione um método de pagamento
        </button>

        <AdicionarCartao openAdicionarCartao={openAdicionarCartao} setOpenAdicionarCartao={() => setOpenAdicionarCartao(!openAdicionarCartao)}/>
      </div>
    </div>
  );
}

export default Cartoes;
