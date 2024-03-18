import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../../context/AppContext';

function LivroDetalhe() {
  const location = useLocation();
  const { data } = location.state || {};
  const { carrinhoItens, setCarrinhoItens } = useContext(AppContext);

  const handleAddCarrinho = () => {
    setCarrinhoItens([ ...carrinhoItens, data ]);
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

          <p className="border-b-2 pb-4 text-sm text-gray-500">
            Gênero(s): {data.categoria.join(", ")}
          </p>
          <p className="pt-8">
            {data.sinopse}
          </p>

          <h3 className="mt-12 text-gray-400 font-medium text-lg">
            Detalhes do livro:
          </h3>
            <div className="grid grid-cols-1 sm:grid-cols-5">
               <p className="flex flex-col">
                Edição
                {data.edicao}
              </p>
              <p>
                ISBN
                {data.ISBN}
              </p>
              <p>
                Páginas
                {data.numeroPaginas}
              </p>
              <p>
                Dimensões
                {data.dimensoes}
              </p>
            </div>
        </div>
        
        <div className="text-end self-center">
          <p className="font-bold text-lg text-gray-800">
            Comprar por R${data.precificacao}
          </p>
          <button
            type="submit"
            className="text-white bg-indigo-800 rounded-md ml-4 mt-2 p-4"
            onClick={handleAddCarrinho}
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  )
}

export default LivroDetalhe