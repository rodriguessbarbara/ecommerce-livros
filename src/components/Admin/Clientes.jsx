import { useContext, useEffect, useState } from "react"
import AppContext from "../../context/AppContext";

function Clientes() {
  const { dadosMock, atualizarDadosMock } = useContext(AppContext);
  const [dadosCadastrais, setDadosCadastrais] = useState([]);
  const [dadosEnderecos, setDadosEnderecos] = useState([]);

  useEffect(() => {
    if (dadosMock && dadosMock.cliente) {
      setDadosCadastrais(dadosMock.cliente);
    }
   }, [dadosMock]); 

   useEffect(() => {
    if (dadosMock && dadosMock.endereco) {
      setDadosEnderecos(dadosMock.endereco);
    }
   }, [dadosMock]);

  function handleMudaStatus(id, status) {
    const novoStatus = dadosCadastrais.map(c => {
      if (c.id === id) {
        return {...c, statusAtivo: status}
      }
      return c;
    });

    atualizarDadosMock({ ...dadosMock, cliente: novoStatus });
  }
  
  return (
    <div className="border-b border-gray-200 py-4 text-gray-600">
      <h3 className="text-2xl font-medium tracking-tight">Consulta de Clientes</h3>
      <h4 className="text-lg font-medium mb-2">Dados cadastrais</h4>
      
      {dadosCadastrais.map((cliente) => (
        <div key={cliente.id} className="rounded-md border-2 border-gray-300 mb-6 p-4">
          <p>Nome Completo:<span> {cliente.nomeCompleto}</span></p>
          <p>Email: {cliente.email}</p>
          <p>CPF: {cliente.CPF}</p>
          <p>Telefone: {cliente.telefone}</p>
          <p>Gênero: {cliente.genero}</p>
          <p>Data Nascimento: {cliente.dataNascimento}</p>

          <p>status: {cliente.statusAtivo ? <span className="text-green-600 font-medium">ativo</span> : <span className="text-red-600 font-medium">inativo</span>}</p>

          <h4 className="font-medium text-gray-600 mt-4">Endereços</h4>
          {dadosEnderecos.map((end) => (
            (end.id === cliente.id && (
              <div key={end.id}>
                <p>{end.lagradouro} {end.enderecoResidencial} {end.num} - {end.tipoResidencia}</p>
                <p>CEP: {end.CEP} </p>
                <p>Bairro: {end.bairro} - {end.cidade}</p>
                <p>{end.estado}, {end.pais}</p>
              </div>
            )) 
          ))}

        <button className={`my-2 rounded font-medium statusCliente ${cliente.statusAtivo ? `text-red-600 hover:text-red-700` : `text-green-600 hover:text-green-700`} `} onClick={() => handleMudaStatus(cliente.id, !cliente.statusAtivo)}>
          {cliente.statusAtivo ? "Inativar cliente" : "Ativar cliente"}
        </button>
      </div>
    ))}

   </div>
  )
}

export default Clientes