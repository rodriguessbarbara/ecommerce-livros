import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import Input from "../Input";

function Dados() {
 const { dadosCliente, atualizarDadosCliente } = useContext(AppContext);
 const [editar, setEditar] = useState("");
 const [formData, setFormData] = useState([]);

 useEffect(() => {
    setFormData(dadosCliente.cliente[0]);
 }, []);

 const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
 };

 const handleSalvar = (event) => {
    event.preventDefault();
    atualizarDadosCliente(formData);
    setEditar(""); 
 };
 
 return (
    <div className="border-b border-gray-200 py-4">
      <h3 className="text-2xl font-medium tracking-tight text-gray-800">Seus Dados</h3>
      
        {!editar && (
          <div className="flex flex-col">
            <h4 className="text-lg font-medium text-gray-600 mt-4 mb-2">Dados cadastrais</h4>
            <p>Nome Completo:<span> {formData.nomeCompleto}</span></p>
            <p>Email: {formData.email}</p>
            <p>CPF: {formData.CPF}</p>
            <p>Telefone: {formData.telefone}</p>
            <p>Gênero: {formData.genero}</p>
            <p>Data Nascimento: {formData.dataNascimento}</p>
          
            <button onClick={() => setEditar("dados")} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Alterar dados cadastrais</button>

            <h4 className="text-lg font-medium text-gray-600 mt-12 mb-2">Endereços cadastrados</h4>
            <div className="flex gap-1">
              <p>Lagradouro: {formData.lagradouro}</p>
              <p>{formData.enderecoResidencial}</p>
              <p>- {formData.tipoResidencia},</p>
              <p>{formData.num}</p>
            </div>

            <p>CEP: {formData.CEP}</p>
            <p>Bairro: {formData.bairro}</p>
            <p>Cidade: {formData.cidade}</p>
            <p>Estado: {formData.estado}</p>
            <p>{formData.pais}</p>

            <button onClick={() => setEditar("enderecos")} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Alterar endereços</button>

            <h4 className="font-medium text-blue-800 mt-4 cursor-pointer" onClick={() => setEditar("senha")}>Alterar apenas a senha</h4>
          </div>          
        )}

      <div >
        {editar == "dados" && (
          <form onSubmit={handleSalvar}>
            <Input label="Nome Completo" type="text" name="nomeCompleto" value={formData.nomeCompleto || ''} onChange={handleInputChange} required/>
            <Input label="Email" type="email" name="email" value={formData.email || ''} onChange={handleInputChange} required/>
            <Input label="CPF" type="text" name="CPF" value={formData.CPF || ''} onChange={handleInputChange} required/>
            <Input label="Telefone" type="text" name="telefone" value={formData.telefone || ''} onChange={handleInputChange} required/>
            <Input label="Gênero" type="text" name="genero" value={formData.genero || ''} onChange={handleInputChange} required/>
            <Input label="Data Nascimento" type="date" name="dataNascimento" value={formData.dataNascimento || ''} onChange={handleInputChange} required/>

            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">Salvar</button>
          </form>
        )}

        {editar == "enderecos" && (
          <form onSubmit={handleSalvar} className="flex flex-col gap-2">
            <Input label="lagradouro" type="text" name="lagradouro" value={formData.lagradouro || ''} onChange={handleInputChange} required/>
            <Input label="endereco Residencial" type="text" name="enderecoResidencial" value={formData.enderecoResidencial || ''} onChange={handleInputChange} required/>
            <Input label="tipo Residencia" type="text" name="tipoResidencia" value={formData.tipoResidencia || ''} onChange={handleInputChange} required/>
            <Input label="numero" type="number" name="num" value={formData.num || ''} onChange={handleInputChange} required/>
            <Input label="CEP" type="text" name="CEP" value={formData.CEP || ''} onChange={handleInputChange} required/>
            <Input label="bairro" type="text" name="bairro" value={formData.bairro || ''} onChange={handleInputChange} required/>
            <Input label="cidade" type="text" name="cidade" value={formData.cidade || ''} onChange={handleInputChange} required/>
            <Input label="estado" type="text" name="estado" value={formData.estado || ''} onChange={handleInputChange} required/>
            <Input label="pais" type="text" name="pais" value={formData.pais || ''} onChange={handleInputChange} required/>

            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">Salvar</button>
          </form>
        )}

        {editar == "senha" && (
          <form onSubmit={handleSalvar} className="flex flex-col gap-2">
            <Input label="Nova senha" type="password" name="senha" value={formData.senha || ''} onChange={handleInputChange} required/>
            <Input label="Repetir nova senha" type="password" name="repetirSenha" value={formData.repetirSenha || ''} onChange={handleInputChange} required/>

            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">Salvar</button>
          </form>
        )}
      </div>

    </div>
 );
}

export default Dados;