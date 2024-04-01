import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import Input from "../Input";

function Dados() {
 const { dadosCliente, atualizarDadosCliente } = useContext(AppContext);
 const [editar, setEditar] = useState("");
 const [dadosCadastrais, setDadosCadastrais] = useState([]);
 const [dadosEnderecos, setDadosEnderecos] = useState([]);

 useEffect(() => {
  if (dadosCliente && dadosCliente.cliente) {
    setDadosCadastrais(dadosCliente.cliente[0]);
  }
 }, [dadosCliente]);

 useEffect(() => {
  if (dadosCliente && dadosCliente.endereco) {
    setDadosEnderecos(dadosCliente.endereco);
  }
 }, [dadosCliente]);


 const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDadosCadastrais({ ...dadosCadastrais, [name]: value });
 };

 const handleInputChangeEnd = (event) => {
  const { name, value } = event.target;
  setDadosCadastrais({ ...dadosEnderecos, [name]: value });
};

 const handleSalvar = (event) => {
    event.preventDefault();
    atualizarDadosCliente(dadosCadastrais);
    setEditar(""); 
 };

 const handleSalvarEnd = (event) => {
  event.preventDefault();
  atualizarDadosCliente(dadosEnderecos);
  setEditar(""); 
};
 
 return (
    <div className="border-b border-gray-200 py-4">
      <h3 className="text-2xl font-medium tracking-tight text-gray-800">Seus Dados</h3>
      
      <div className="flex flex-col">
        {!editar && (
          <>
            <h4 className="text-lg font-medium text-gray-600 mt-4 mb-2">Dados cadastrais</h4>
            <p>Nome Completo:<span> {dadosCadastrais.nomeCompleto}</span></p>
            <p>Email: {dadosCadastrais.email}</p>
            <p>CPF: {dadosCadastrais.CPF}</p>
            <p>Telefone: {dadosCadastrais.telefone}</p>
            <p>Gênero: {dadosCadastrais.genero}</p>
            <p>Data Nascimento: {dadosCadastrais.dataNascimento}</p>
          
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
        </div>          

      <div >
        {editar == "dados" && (
          <form onSubmit={handleSalvarEnd}>
            <Input label="Nome Completo" type="text" name="nomeCompleto" value={dadosCadastrais.nomeCompleto || ''} onChange={handleInputChange} required/>
            <Input label="Email" type="email" name="email" value={dadosCadastrais.email || ''} onChange={handleInputChange} required/>
            <Input label="CPF" type="text" name="CPF" value={dadosCadastrais.CPF || ''} onChange={handleInputChange} required/>
            <Input label="Telefone" type="text" name="telefone" value={dadosCadastrais.telefone || ''} onChange={handleInputChange} required/>
            <Input label="Gênero" type="text" name="genero" value={dadosCadastrais.genero || ''} onChange={handleInputChange} required/>
            <Input label="Data Nascimento" type="date" name="dataNascimento" value={dadosCadastrais.dataNascimento || ''} onChange={handleInputChange} required/>

            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">Salvar</button>
          </form>
        )}

        {editar == "enderecos" && (
          <form onSubmit={handleSalvar} className="flex flex-col gap-2">
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
            <Input label="Nova senha" type="password" name="senha" value={dadosCadastrais.senha || ''} onChange={handleInputChange} required/>
            <Input label="Repetir nova senha" type="password" name="repetirSenha" value={dadosCadastrais.repetirSenha || ''} onChange={handleInputChange} required/>

            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">Salvar</button>
          </form>
        )}
      </div>

    </div>
 );
}

export default Dados;