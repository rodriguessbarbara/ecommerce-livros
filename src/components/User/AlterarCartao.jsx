import { useContext, useState, useEffect } from 'react';
import Input from '../Input';
import AppContext from '../../context/AppContext';

/* eslint-disable react/prop-types */
function AlterarCartao({ isOpenAlterarCartao, setIsOpenAlterarCartao, cartao }) {
  const [ nomeValue, setNomeValue ] = useState('');
  const [ isPreferencial, setIsPreferencial ] = useState(null);
  const { cartoes, setCartoes } = useContext(AppContext);

  useEffect(() => {
    if (cartao) {
      setNomeValue(cartao.nome);
      setIsPreferencial(cartao.preferencial);
    }
  }, [cartao]);

  const handleSaveCartao = (event) => {
    event.preventDefault();
    const updatedCartao = { ...cartao, nome: nomeValue, preferencial: isPreferencial };
    const updatedCartoes = cartoes.map(item => (item.id === updatedCartao.id ? updatedCartao : item));
    setCartoes(updatedCartoes);

    setIsOpenAlterarCartao(false);
  };

  const handleRemoveCartao = (event) => {
    event.preventDefault();
    const removidoCartoes = cartoes.filter(item => item.id !== cartao.id);
    setCartoes(removidoCartoes);

    setIsOpenAlterarCartao(false);
  };

  if (isOpenAlterarCartao) {
    return (
      <div className="text-gray-800 bg-opacity-85 bg-gray-600 fixed inset-0 z-50 flex">
        <div className="h-1/2 max-w-2xl w-full mx-auto my-auto bg-white rounded-lg pt-8">
        
          <div className="mx-10">
            <div className="flex justify-between text-lg border-b-2 pb-2">
              <h3 className="text-lg font-medium">Editar cartão</h3>
              <button className="font-bold border-2 border-green-600 hover:bg-green-10 rounded-lg px-2" onClick={setIsOpenAlterarCartao}>
                X
              </button>
            </div>

            <form onSubmit={handleSaveCartao} className="flex flex-col gap-4 mt-4">
              <Input label="Nome no cartão" type="text" name="nome" span="2" onChange={(event) => setNomeValue(event.target.value)} value={nomeValue} required/>
              <div>
                <label className="text-sm font-medium text-gray-900">
                    Cartão é seu preferencial?
                </label>
                <select name="preferencial" required onChange={(event) => setIsPreferencial(event.target.value)} value={isPreferencial}
                className="w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6">
                  <option value={true} className="text-gray-800">Sim</option>
                  <option value={false} className="text-gray-800">Não</option>
                </select>
              </div>

              <button type="submit" className="text-white bg-green-600 py-2 px-4 rounded-lg mt-8">
                Salvar
              </button>
            </form>

            <button className="text-red-600 mt-2" onClick={handleRemoveCartao}>
              Remover cartão
            </button>
          </div>
      </div>
    </div>  
    )
  }
}

export default AlterarCartao