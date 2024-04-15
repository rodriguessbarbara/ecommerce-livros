import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import Input from "../Input";
import Erro from "../Erro";
import Loading from "../Loading";

function Dados() {
 const { dadosCliente, atualizarDadosCliente, listarCliente, userId, setDadosCliente, deletarCliente, erro, loading } = useContext(AppContext);
 const [editar, setEditar] = useState("");
//  const [dadosCadastrais, setDadosCadastrais] = useState([]);
 const [dadosEnderecos, setDadosEnderecos] = useState([]);

 useEffect(() => {
  listarCliente(userId);
 }, [setDadosCliente])

//  useEffect(() => {
//   listarEndereco(userId);
//  }, [userId])

 const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDadosCliente({ ...dadosCliente, [name]: value });
 };
 
 const handleInputChangeEnd = (event) => {
  const { name, value } = event.target;
  setDadosCliente({ ...dadosEnderecos, [name]: value });
};

 const handleSalvar = (event) => {
    event.preventDefault();

    atualizarDadosCliente(userId, {
        nome: dadosCliente.nome,
        cpf: dadosCliente.cpf,
        email: dadosCliente.email,
        senha: dadosCliente.senha,
        genero: dadosCliente.genero,
        telefone: dadosCliente.telefone,
        dataNascimento: dadosCliente.datanascimento
      });
    setEditar(""); 
 };

 const handleSalvarEnd = (event) => {
  event.preventDefault();
  atualizarDadosCliente(dadosEnderecos);
  setEditar(""); 
};

 function handleExcluirConta(event) {
  event.preventDefault();
  const confirmacao = window.confirm("Você realmente deseja excluir sua conta?");
  if (confirmacao) {
    deletarCliente(userId);
  } else {
    event.preventDefault();
  }
 }
 
 if (loading) return <Loading/>
 return (
    <div className="border-b border-gray-200 py-4">
      <h3 className="text-2xl font-medium tracking-tight text-gray-800">Seus Dados</h3>
      
      <div className="flex flex-col">
        {!editar && (
          <>
            <h4 className="text-lg font-medium text-gray-600 mt-4 mb-2">Dados cadastrais</h4>
            <p>Nome Completo:<span> {dadosCliente.nome}</span></p>
            <p>Email: {dadosCliente.email}</p>
            <p>CPF: {dadosCliente.cpf}</p>
            <p>Telefone: {dadosCliente.telefone}</p>
            <p>Gênero: {dadosCliente.genero}</p>
            {dadosCliente.datanascimento && typeof dadosCliente.datanascimento === 'string' && (
              <p>Data Nascimento: {dadosCliente.datanascimento}</p>
            )}
          
            <button onClick={() => setEditar("dados")} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Alterar dados cadastrais</button>
          </>
            )}
          
            <h4 className="text-lg font-medium text-gray-600 mt-12 mb-2">Endereços cadastrados</h4>
            {dadosEnderecos.map((end) => (
              <>
              <div className="flex gap-1">
                <p>Lagradouro: {end.lagradouro}</p>
                <p>{end.enderecoResidencial}</p>
                <p>- {end.tipoResidencia},</p>
                <p>{end.num}</p>
              </div>
  
              <p>CEP: {end.CEP}</p>
              <p>Bairro: {end.bairro} - {end.cidade}</p>
              <p>{end.estado}, {end.pais}</p>
  
              <button onClick={() => setEditar("enderecos")} className="bg-blue-500 text-white px-4 py-2 rounded mt-2 mb-6">Alterar endereço</button>
              </>
            ))}

            <h4 className="font-medium text-blue-800 mt-4 cursor-pointer" onClick={() => setEditar("senha")}>Alterar apenas a senha</h4>
            <button className="font-medium text-blue-800 mt-4 cursor-pointer text-start" onClick={handleExcluirConta}>Excluir conta</button>

        </div>          

      <div >
        {editar == "dados" && (
          <form onSubmit={handleSalvar}>
            <Input label="Nome Completo" type="text" name="nome" value={dadosCliente.nome || ''} onChange={handleInputChange} required/>
            <Input label="Email" type="email" name="email" value={dadosCliente.email || ''} onChange={handleInputChange} required/>
            <Input label="CPF" type="text" name="cpf" value={dadosCliente.cpf || ''} onChange={handleInputChange} required/>
            <Input label="Telefone" type="text" name="telefone" value={dadosCliente.telefone || ''} onChange={handleInputChange} required/>
            <Input label="Gênero" type="text" name="genero" value={dadosCliente.genero || ''} onChange={handleInputChange} required/>
            <Input label="Data Nascimento" type="date" name="datanascimento" value={dadosCliente.datanascimento || ''} onChange={handleInputChange} required/>

            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">Salvar</button>
          </form>
        )}

        {editar == "enderecos" && (
          <form onSubmit={handleSalvarEnd} className="flex flex-col gap-2">
            {dadosEnderecos.map((end) => (
            <>
              <Input label="lagradouro" type="text" name="lagradouro" value={end.lagradouro || ''} onChange={handleInputChangeEnd} required/>
              <Input label="endereco Residencial" type="text" name="enderecoResidencial" value={end.enderecoResidencial || ''} onChange={handleInputChangeEnd} required/>
              <Input label="tipo Residencia" type="text" name="tipoResidencia" value={end.tipoResidencia || ''} onChange={handleInputChangeEnd} required/>
              <Input label="numero" type="number" name="num" value={end.num || ''} onChange={handleInputChangeEnd} required/>
              <Input label="CEP" type="text" name="CEP" value={end.CEP || ''} onChange={handleInputChangeEnd} required/>
              <Input label="bairro" type="text" name="bairro" value={end.bairro || ''} onChange={handleInputChangeEnd} required/>
              <Input label="cidade" type="text" name="cidade" value={end.cidade || ''} onChange={handleInputChangeEnd} required/>
              <Input label="estado" type="text" name="estado" value={end.estado || ''} onChange={handleInputChangeEnd} required/>
              <Input label="pais" type="text" name="pais" value={end.pais || ''} onChange={handleInputChangeEnd} required/>

              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">Salvar</button>
            </>
            ))}
          </form>
        )}

        {editar == "senha" && (
          <form onSubmit={handleSalvar} className="flex flex-col gap-2">
            <Input label="Nova senha" type="password" name="senha" value={dadosCliente.senha || ''} onChange={handleInputChange} required/>
            <Input label="Repetir nova senha" type="password" name="repetirSenha" value={dadosCliente.repetirSenha || ''} onChange={handleInputChange} required/>

            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">Salvar</button>
          </form>
        )}
      </div>

      {/* <Erro erro={erro}/> */}
    </div>
 );
}

export default Dados;