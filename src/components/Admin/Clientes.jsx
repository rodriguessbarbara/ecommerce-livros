import { useContext, useEffect, useState } from "react"
import AppContext from "../../context/AppContext";
import Loading from "../Loading";

function Clientes() {
  const { dadosMock, listarClientes, dadosCliente, setDadosCliente, atualizarDadosCliente, loading } = useContext(AppContext);
  const [dadosEnderecos, setDadosEnderecos] = useState([]);

   useEffect(() => {
    listarClientes();
   }, [setDadosCliente])
  
   useEffect(() => {
    if (dadosMock && dadosMock.endereco) {
      setDadosEnderecos(dadosMock.endereco);
    }
   }, [dadosMock]);
   
  function handleMudaStatus(id, status) {
    const confirmacao = window.confirm("Deseja realmente alterar o status dessa conta?");

    const novoStatus = dadosCliente.map(c => {
      if (c.id === id) {
        if (confirmacao) {
          atualizarDadosCliente(id, {ativo: status});
        }
        return {...c, ativo: status}
      }
      return c;
    });

    if (confirmacao) setDadosCliente(novoStatus)
  }

  if (loading) return <Loading/>
  return (
    <div className="py-4 text-gray-600">
      <h3 className="text-2xl font-medium tracking-tight">Consulta de Clientes</h3>
      <h4 className="text-lg font-medium mb-8">Dados cadastrais</h4>
      
      <table className="w-full table-auto mb-6 text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome Completo</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Gênero</th>
            <th>Data Nascimento</th>
            <th>Status</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {dadosCliente.map((cliente) => (
            <tr key={cliente.id}>
              <td className="border p-4">{cliente.id}</td>
              <td className="border p-4">{cliente.nome}</td>
              <td className="border p-4">{cliente.email}</td>
              <td className="border p-4">{cliente.cpf}</td>
              <td className="border p-4">{cliente.telefone}</td>
              <td className="border p-4">{cliente.genero}</td>
              <td className="border p-4">{cliente.dataNascimento}</td>
              <td className="border p-4">
                {cliente.ativo ? <span className="text-green-600 font-medium">ativo</span> : <span className="text-red-600 font-medium">inativo</span>}
              </td>
              <td className="border p-4">
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
              </td>
              <td className="border px-4 py-2">
                <button className={`rounded font-medium statusCliente ${cliente.ativo ? `text-red-600 hover:text-red-700` : `text-green-600 hover:text-green-700`} `} onClick={() => handleMudaStatus(cliente.id, !cliente.ativo)}>
                  {cliente.ativo ? "Inativar cliente" : "Ativar cliente"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Clientes