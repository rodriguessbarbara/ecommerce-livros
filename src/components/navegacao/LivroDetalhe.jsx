import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import Carrinho from '../Carrinho/Carrinho';

function LivroDetalhe() {
  const location = useLocation();
  const { data } = location.state || {};
  const { carrinhoItens, setCarrinhoItens } = useContext(AppContext);

  const handleAddCarrinho = () => {
    const itemExistente = carrinhoItens.find(item => item.id === data.id);

    if (itemExistente) {
      if (itemExistente.quantidadeCarrinho < data.quantidade) {
        setCarrinhoItens(carrinhoItens.map(item =>
          item.id === data.id ? { ...item, quantidadeCarrinho: item.quantidadeCarrinho + 1 } : item
        ));
      }
    } else {
       setCarrinhoItens([...carrinhoItens, { ...data, quantidadeCarrinho: 1 }]);
    }
   }

  return (
    <div className="text-gray-600 p-6 mt-24 mx-16 pb-12">
      <div className="w-full h-full overflow-hidden rounded-md lg:aspect-none flex gap-10">
        <img
            src={data.imageSrc}
            alt={data.imageAlt}
            className="lg:w-1/4 lg:h-1/2 md:h-1/3 bg-gray-500 group-hover:opacity-75 cursor-pointer"
          />

        <div className="flex flex-col md:max-w-2xl">
          <div className="items-end gap-10 flex">
            <h2 className='text-gray-700 font-bold text-4xl'>
              {data.titulo}
            </h2>
            <p className="text-gray-500 font-medium text-lg">
              Ano {data.ano}
            </p>
          </div>

          <p className="my-2 text-gray-600">
            Autor(a) {data.autor} | Editora {data.editora}
          </p>

          <p className="border-b-2 pb-4 text-sm text-gray-600">
              Categoria(s): {data.LivroCategoria.map((categoria) => categoria.Categorium.nome).join(", ")}
          </p>
          <p className="pt-8">
            {data.sinopse}
          </p>

          <h3 className="mt-12 text-gray-400 font-medium text-lg">
            Detalhes do livro:
          </h3>
          <table className="mt-4 border border-gray-300">
            <tbody>
              <tr className="border-b">
                <td className="font-medium p-2">Edição:</td>
                <td>{data.edicao}</td>
              </tr>
              <tr className="border-b">
                <td className="font-medium p-2">ISBN:</td>
                <td>{data.ISBN}</td>
              </tr>
              <tr className="border-b">
                <td className="font-medium p-2">Páginas:</td>
                <td>{data.numeroPaginas}</td>
              </tr>
              <tr>
                <td className="font-medium p-2">Dimensões:</td>
                <td>{data.dimensoes}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="text-end self-center">
          <p className="font-bold text-lg text-gray-800">
            Comprar por R${data.precificacao}
          </p>
          
          <button
            type="submit"
            className={`text-white rounded-md ml-4 mt-2 p-4 ${data.ativo ? 'bg-indigo-800' : 'bg-gray-500'}`}
            onClick={handleAddCarrinho}
            disabled={!data.ativo}

          >
            Adicionar ao carrinho
          </button>
          {(!data.ativo) && <p className="text-red-500 font-medium">Indisponível</p>}

        </div>
      </div>

      <Carrinho/>

    </div>
  )
}

export default LivroDetalhe