/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import MsgCompraEfetuada from "./MsgCompraEfetuada";
import AdicionarCartao from "./AdicionarCartao";
import { useLocation } from 'react-router-dom';
import ResumoCompra from "./ResumoCompra";
import Input from "../Input";
import Loading from "../Loading";

function PagamentoCompra() {
  const { listarCliente, userId, setDadosCliente, dadosCliente, loading } = useContext(AppContext);

  const location = useLocation();
  const { endSelecionado } = location.state || {};
  const [openModal, setOpenModal] = useState(false);
  const [cartaoSelecionado, setCartaoSelecionado] = useState([]);
  const [openAdicionarCartao, setOpenAdicionarCartao] = useState(false);
  const [precoFinal, setPrecoFinal] = useState(0);
  const [precoInput1, setPrecoInput1] = useState(10);
  const [precoInput2, setPrecoInput2] = useState(10);
  const [idPedido, setIdPedido] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await listarCliente(userId);
    }
    fetchData();
   }, [setDadosCliente])

  const handleCartaoSelecionado = (cartao) => {
    const cartaoIndex = cartaoSelecionado.findIndex(item => item.id === cartao.id);

    if (cartaoIndex === -1) {
      setCartaoSelecionado([...cartaoSelecionado, cartao]);
    } else {  
      const updatedCartoes = cartaoSelecionado.filter((item) => item.id != cartao.id);
      setCartaoSelecionado(updatedCartoes);
    }
  };

  const handleInputChange = (event, cartaoId) => {
    const newValue = parseFloat(event.target.value);
    
    if ((cartaoId === cartaoSelecionado[0].id)) {
      if (newValue > (precoFinal - precoInput2)) {
        setPrecoInput1(precoFinal - precoInput2);
      } else setPrecoInput1(newValue);
    } else {
      if (newValue > (precoFinal - precoInput1)) {
        setPrecoInput2(precoFinal - precoInput1);
      } else setPrecoInput2(newValue);
    }
  };

  if (loading) return <Loading/>
  return (
    <div className="min-h-screen max-w-7xl mx-auto text-gray-800 mt-16 px-4 grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <h2 className="text-2xl font-medium text-gray-800 pt-5">
            Finalizar a Compra
        </h2>

        <div className="my-4 flex flex-col gap-6">
          {dadosCliente && dadosCliente.Cartaos && dadosCliente.Cartaos.map((cartao) => (
            <div key={cartao.id} className="rounded-md bg-gray-100 px-6 py-10 border-gray-300">

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={cartaoSelecionado.some(item => item.id === cartao.id)}
                onChange={() => handleCartaoSelecionado(cartao)}
                className="rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                disabled={cartaoSelecionado.length === 2 && !cartaoSelecionado.some(item => item.id === cartao.id)}
              />
              <span className="ml-2 font-medium text-gray-800 text-lg">
                Bandeira {cartao.bandeira}
              </span>
            </label>

            <p className="text-gray-800">Cartão com final <span className="font-medium">{cartao.final}</span></p>
            <p className="text-gray-800">{cartao.nome}</p>
            
            {cartaoSelecionado.length > 1 && cartaoSelecionado.includes(cartao) && (
                <Input
                type="number"
                label={`Valor para o cartão ${cartao.id}`}
                name="valor"
                placeholder="Valor"
                min="10"
                max={cartao.id === cartaoSelecionado[0].id ? (precoFinal - 10): (precoFinal - precoInput1)}
                value={cartao.id === cartaoSelecionado[0].id ? precoInput1 : precoInput2}
                onChange={(event) => handleInputChange(event, cartao.id)}
                required
                />
              )
            }
            </div>
          ))}
        </div> 
        
        <button className="pb-6 text-blue-800" onClick={() => setOpenAdicionarCartao(true)}>
            Adicione um novo cartão
        </button>

        <AdicionarCartao openAdicionarCartao={openAdicionarCartao} setOpenAdicionarCartao={() => setOpenAdicionarCartao(!openAdicionarCartao)}/>
      </div>

      <ResumoCompra cartaoSelecionado={cartaoSelecionado} endSelecionado={endSelecionado} setModalOpen={() => setOpenModal(!openModal)} precoFinal={precoFinal} setPrecoFinal={setPrecoFinal} valorInputs={precoInput1 + precoInput2} setIdPedido={setIdPedido}/>
      <MsgCompraEfetuada isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} idPedido={idPedido}/>
    </div>
  )
}

export default PagamentoCompra;