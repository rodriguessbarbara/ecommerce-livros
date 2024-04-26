import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import Input from "../Input";
import Loading from "../Loading";
import AdicionarEndereco from "./AdicionarEndereco";

function Dados() {
 const { dadosCliente, listarCliente, userId, setDadosCliente, deletarEntidade, loading, atualizarEntidade } = useContext(AppContext);
 const [editar, setEditar] = useState("");
 const [openAdicionarEndereco, setOpenAdicionarEndereco] = useState(false);

 useEffect(() => {
  const fetchData = async () => {
    await listarCliente(userId);
  }
  fetchData();
 }, [setDadosCliente])

 const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDadosCliente({ ...dadosCliente, [name]: value });
 };
 
 const handleInputChangeEnd = (event, endIndex) => {
  const { name, value } = event.target;
  const updatedEnderecos = [...dadosCliente.Enderecos];
  updatedEnderecos[endIndex][name] = value;
  setDadosCliente({ ...dadosCliente, Enderecos: updatedEnderecos });
};

 const handleSalvar = (event) => {
    event.preventDefault();
    atualizarEntidade(userId, {
        nome: dadosCliente.nome,
        cpf: dadosCliente.cpf,
        email: dadosCliente.email,
        senha: dadosCliente.senha,
        genero: dadosCliente.genero,
        telefone: dadosCliente.telefone,
        dataNascimento: dadosCliente.dataNascimento
      }, "clientes");
    setEditar(""); 
 };

 const handleSalvarEnd = (event, endId, data) => {
  event.preventDefault();
  atualizarEntidade(endId, {
    lagradouro: data.lagradouro,
    enderecoResidencial: data.enderecoResidencial,
    tipoResidencia: data.tipoResidencia,
    num: data.num,
    CEP: data.CEP,
    bairro: data.bairro,
    cidade: data.cidade,
    estado: data.estado,
    pais: data.pais
  }, "endereco");
  setEditar(""); 
};

 function handleExcluirConta(event) {
  event.preventDefault();
  const confirmacao = window.confirm("Você realmente deseja excluir sua conta?");
  if (confirmacao) {
    deletarEntidade(userId, "clientes");
  } else {
    event.preventDefault();
  }
 }

 function handleExcluirEndereco(event, id) {
  event.preventDefault();
  const confirmacao = window.confirm("Você realmente deseja excluir esse endereco?");
  if (confirmacao) {
    deletarEntidade(id, "endereco");

    const novosEnderecos = dadosCliente.Enderecos.filter(endereco => endereco.id !== id);
    setDadosCliente({ ...dadosCliente, Enderecos: novosEnderecos });

    setEditar("");
  } else {
    event.preventDefault();
  }
 }
 
 if (loading) return <Loading/>
 return (
    <div className="border-b border-gray-200 py-4">
      <h3 className="text-2xl font-medium tracking-tight text-gray-800">Seus Dados</h3>
      
      <div className="flex flex-col">
        {!editar && dadosCliente && dadosCliente.Enderecos && (
          <>
            <h4 className="text-lg font-medium text-gray-600 mt-4 mb-2">Dados cadastrais</h4>
            <p><span className="font-medium">Nome Completo:</span> {dadosCliente.nome}</p>
            <p><span className="font-medium">Email:</span> {dadosCliente.email}</p>
            <p><span className="font-medium">CPF:</span> {dadosCliente.cpf}</p>
            <p><span className="font-medium">Telefone:</span> {dadosCliente.telefone}</p>
            <p><span className="font-medium">Gênero:</span> {dadosCliente.genero}</p>
            {dadosCliente.dataNascimento && typeof dadosCliente.dataNascimento === 'string' && (
              <p><span className="font-medium">Data Nascimento:</span> {dadosCliente.dataNascimento}</p>
            )}
            <p><span className="font-medium">Tipo de perfil:</span> {dadosCliente.role === 'user' ? `Usuário padrão` : `Administrador`}</p>
          
            <button onClick={() => setEditar("dados")} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Alterar dados cadastrais</button>

            <h4 className="text-lg font-medium text-gray-600 mt-12 mb-2">Endereços cadastrados</h4>
            {dadosCliente.Enderecos.map((end) => (
              <div key={end.id}>
                <div className="flex gap-1">
                  <p><span className="font-medium">Lagradouro: </span>{end.lagradouro}</p>
                  <p>{end.enderecoResidencial}</p>
                  <p>- {end.tipoResidencia},</p>
                  <p>{end.num}</p>
                </div>
    
                <p><span className="font-medium">CEP: </span>{end.CEP}</p>
                <p><span className="font-medium">Bairro: </span>{end.bairro} - {end.cidade}</p>
                <p>{end.estado}, {end.pais}</p>
    
                <button onClick={() => setEditar("enderecos")} className="bg-blue-500 text-white px-4 py-2 rounded mt-2 mb-6">Alterar endereço</button>
              </div>
            ))}

            <button className="text-blue-800 font-medium text-start" onClick={() => setOpenAdicionarEndereco(true)}>
              Adicione um novo endereço
            </button>
            <h4 className="font-medium text-blue-800 mt-4 cursor-pointer" onClick={() => setEditar("senha")}>Alterar apenas a senha</h4>
            <button className="font-medium text-red-600 mt-4 cursor-pointer text-start" onClick={handleExcluirConta}>Excluir conta</button>
          </>
          )}
        </div>          

      <div>
        {editar == "dados" && (
          <form onSubmit={handleSalvar}>
            <Input label="Nome Completo" type="text" name="nome" value={dadosCliente.nome || ''} onChange={handleInputChange} required/>
            <Input label="Email" type="email" name="email" value={dadosCliente.email || ''} onChange={handleInputChange} required/>
            <Input label="CPF" type="text" name="cpf" value={dadosCliente.cpf || ''} onChange={handleInputChange} required/>
            <Input label="Telefone" type="text" name="telefone" value={dadosCliente.telefone || ''} onChange={handleInputChange} required/>
            <Input label="Gênero" type="text" name="genero" value={dadosCliente.genero || ''} onChange={handleInputChange} required/>
            <Input label="Data Nascimento" type="date" name="datanascimento" value={dadosCliente.dataNascimento || ''} onChange={handleInputChange} required/>

            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">Salvar</button>
          </form>
        )}

        {editar == "enderecos" && dadosCliente.Enderecos.map((end, index) => (
          <form onSubmit={(event) => handleSalvarEnd(event, end.id, end)} className="flex flex-col gap-2" key={end.id}>
            <Input label="lagradouro" type="text" name="lagradouro" value={end.lagradouro || ''} onChange={(event) => (handleInputChangeEnd(event, index))} required/>
            <Input label="endereco Residencial" type="text" name="enderecoResidencial" value={end.enderecoResidencial || ''} onChange={(event) => (handleInputChangeEnd(event, index))} required/>
            <Input label="tipo Residencia" type="text" name="tipoResidencia" value={end.tipoResidencia || ''} onChange={(event) => (handleInputChangeEnd(event, index))} required/>
            <Input label="numero" type="number" name="num" value={end.num || ''} onChange={(event) => (handleInputChangeEnd(event, index))} required/>
            <Input label="CEP" type="text" name="CEP" value={end.CEP || ''} onChange={(event) => (handleInputChangeEnd(event, index))} required/>
            <Input label="bairro" type="text" name="bairro" value={end.bairro || ''} onChange={(event) => (handleInputChangeEnd(event, index))} required/>
            <Input label="cidade" type="text" name="cidade" value={end.cidade || ''} onChange={(event) => (handleInputChangeEnd(event, index))} required/>
            <Input label="estado" type="text" name="estado" value={end.estado || ''} onChange={(event) => (handleInputChangeEnd(event, index))} required/>
            <Input label="pais" type="text" name="pais" value={end.pais || ''} onChange={(event) => (handleInputChangeEnd(event, index))} required/>

            <button className="font-medium text-red-600 cursor-pointer text-start" onClick={(event) => handleExcluirEndereco(event, end.id)}>Excluir Endereco</button>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mb-4">Salvar</button>
          </form>
        ))}

        {editar == "senha" && (
          <form onSubmit={handleSalvar} className="flex flex-col gap-2">
            <Input label="Nova senha" type="password" name="senha" value={dadosCliente.senha || ''} onChange={handleInputChange} required/>
            {/* <Input label="Repetir nova senha" type="password" name="repetirSenha" value={dadosCliente.repetirSenha || ''} onChange={handleInputChange} required/> */}
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">Salvar</button>
          </form>
        )}

        {editar &&
          <p className="font-medium text-red-600 mt-4 cursor-pointer" onClick={() => setEditar("")}>{`← Voltar`}</p>
        }
      </div>

      <AdicionarEndereco openAdicionarEndereco={openAdicionarEndereco} setOpenAdicionarEndereco={() => setOpenAdicionarEndereco(!openAdicionarEndereco)}/>

    </div>
 );
}

export default Dados;