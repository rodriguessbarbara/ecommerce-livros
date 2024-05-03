/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import Input from '../Input';
import AppContext from '../../context/AppContext';

function AdicionarEndereco({ openAdicionarEndereco, setOpenAdicionarEndereco }) {
  const [formData, setFormData] = useState([]);
  const { criarEntidade, userId } = useContext(AppContext);

  async function handleAdicionarEndereco(event) {
    event.preventDefault();
      await criarEntidade({
        lagradouro: formData.lagradouro,
        enderecoResidencial: formData.enderecoResidencial,
        tipoResidencia: formData.tipoResidencia,
        num: formData.num,
        CEP: formData.CEP,
        bairro: formData.bairro,
        cidade: formData.cidade,
        estado: formData.estado,
        pais: formData.pais,
        cliente_id: userId
      }, "endereco");
  
      setFormData([]);
      setOpenAdicionarEndereco(false);
    }
    
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
 };

  if (openAdicionarEndereco) {
    return (
      <div className="text-gray-800 bg-opacity-85 bg-gray-600 fixed inset-0 z-50 flex">
        <div className="h-2/3 max-w-2xl w-full mx-auto my-auto bg-white rounded-lg pt-8">
        
          <div className="mx-10">
            <div className="flex justify-between text-lg border-b-2 pb-2">
              <h3 className="text-lg font-medium">Adicionar novo endereço</h3>
              <button className="font-bold border-2 border-green-600 hover:bg-green-10 rounded-lg px-2" onClick={setOpenAdicionarEndereco}>
                X
              </button>
            </div>

            <form onSubmit={handleAdicionarEndereco} className="grid grid-cols-3 gap-4 mt-4">
              <Input label="lagradouro" type="text" name="lagradouro" value={formData.lagradouro} onChange={handleInputChange} required/>
              <Input label="endereco Residencial" type="text" name="enderecoResidencial" value={formData.enderecoResidencial} onChange={handleInputChange} required/>
              <Input label="tipo Residencia" type="text" name="tipoResidencia" value={formData.tipoResidencia} onChange={handleInputChange} required/>
              <Input label="numero" type="number" name="num" value={formData.num} onChange={handleInputChange} required/>
              <Input label="CEP" type="text" name="CEP" value={formData.CEP} onChange={handleInputChange} required/>
              <Input label="bairro" type="text" name="bairro" value={formData.bairro} onChange={handleInputChange} required/>
              <Input label="cidade" type="text" name="cidade" value={formData.cidade} onChange={handleInputChange} required/>
              <Input label="estado" type="text" name="estado" value={formData.estado} onChange={handleInputChange} required/>
              <Input label="pais" type="text" name="pais" value={formData.pais} onChange={handleInputChange} required/>

            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">Salvar</button>
            </form>
          </div>
      </div>
    </div>  
    )
  }
}

export default AdicionarEndereco;
