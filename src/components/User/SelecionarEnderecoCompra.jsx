import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import AdicionarEndereco from "./AdicionarEndereco";

function SelecionarEnderecoCompra() {
  const { dadosMock, precoTotal } = useContext(AppContext);

  const navigate = useNavigate();
  const [endSelecionado, setEndSelecionado] = useState(null);
  const [enderecoData, setEnderecoData] = useState([]);
  const [openAdicionarEndereco, setOpenAdicionarEndereco] = useState(false);

  useEffect(() => {
    if (dadosMock) {
      setEnderecoData(dadosMock.endereco);
    }
  }, [dadosMock]);

  const handleProxTela = () => {
    if (!endSelecionado) {
      return alert("Por favor, selecione um endereço para continuar."); 
    }
    navigate("/conta/pagamento-compra", { state: {endSelecionado: endSelecionado} });
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto text-gray-800 mt-16 px-4">
      <h2 className="text-2xl font-medium text-gray-800 pt-5">
          Escolha o endereço de entrega
      </h2>
        
      <div className="my-4 flex flex-col gap-6">
        {enderecoData.map((end) => (
          <div key={end.id} className="rounded-md bg-gray-100 px-6 py-10 border-gray-300">

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={end === endSelecionado}
                onChange={() => setEndSelecionado(end)}
                className="rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
              />
              <span className="ml-2 font-medium text-gray-800 text-lg">
              {end.lagradouro} {end.enderecoResidencial}, {end.num}
              </span>
            </label>

            <p>{end.lagradouro} {end.enderecoResidencial}, {end.num} - {end.bairro}, {end.cidade}</p>
            <p>{end.tipoResidencia}</p>
            <p>CEP: {end.CEP} - {end.estado}, {end.pais}</p>
          </div>

        ))}
      </div> 

      <button className="pb-6 text-blue-800" onClick={() => setOpenAdicionarEndereco(true)}>
          Adicione um novo endereço
      </button>

      <div className="self-end text-end">
        <p className="font-bold text-lg text-gray-800">
              Subtotal: R$ {precoTotal}
        </p>

        <button onClick={handleProxTela}
            className="rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
            Continuar
        </button>
      </div>

      <AdicionarEndereco openAdicionarEndereco={openAdicionarEndereco} setOpenAdicionarEndereco={() => setOpenAdicionarEndereco(!openAdicionarEndereco)}/>
    </div>
  )
}

export default SelecionarEnderecoCompra;