/* eslint-disable react/prop-types */
import { useContext } from 'react';
import Input from '../Input';
import AppContext from '../../context/AppContext';
import useForm from '../../hooks/useForm';

function AdicionarCartao({ openAdicionarCartao, setOpenAdicionarCartao }) {
  const nome = useForm();
  const bandeira = useForm();
  const numeroCartao = useForm();
  const codSeguranca = useForm();

  const { userId, criarEntidade } = useContext(AppContext);

  async function handleAdicionarCartao(event) {
    event.preventDefault();

    if (numeroCartao.validate() && nome.validate() && codSeguranca.validate()) {
      criarEntidade({
        bandeira: bandeira.value,
        numeroCartao: numeroCartao.value,
        nome: nome.value,
        final: (numeroCartao.value).slice(-4),
        cvv: codSeguranca.value,
        preferencial: false,
        cliente_id: userId
      }, "cartao");

      setOpenAdicionarCartao(false);
    }
  }

  if (openAdicionarCartao) {
    return (
      <div className="text-gray-800 bg-opacity-85 bg-gray-600 fixed inset-0 z-50 flex">
        <div className="h-2/3 max-w-2xl w-full mx-auto my-auto bg-white rounded-lg pt-8">
        
          <div className="mx-10">
            <div className="flex justify-between text-lg border-b-2 pb-2">
              <h3 className="text-lg font-medium">Adicionar novo cartão</h3>
              <button className="font-bold border-2 border-green-600 hover:bg-green-10 rounded-lg px-2" onClick={setOpenAdicionarCartao}>
                X
              </button>
            </div>

            <form onSubmit={handleAdicionarCartao} className="flex flex-col gap-2 mt-4">
              <Input label="Numero do cartão" type="text" name="numero-cartao" span="2" {...numeroCartao} maxLength="16" required/>
              <Input label="Nome no cartão" type="text" name="nome" span="2" {...nome} required/>
              <div>
                <label className="text-sm font-medium text-gray-900">
                    Bandeira do cartão
                </label>
                <select name="bandeira" {...bandeira} required
                className="w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6">
                  <option value="Visa" className="text-gray-800">Visa</option>
                  <option value="Mastercard" className="text-gray-800">Mastercard</option>
                  <option value="elo" className="text-gray-800">elo</option>
                </select>
              </div>
              <Input label="Código de segurança(CVV)" type="text" name="codigo-seguranca" span="2" {...codSeguranca} maxLength="3" required/>

              <button type="submit" className="text-white bg-green-600 py-2 px-4 rounded-lg mt-6">
                Salvar
              </button>
            </form>
          </div>
      </div>
    </div>  
    )
  }
}

export default AdicionarCartao;
