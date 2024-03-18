import { useLocation } from 'react-router-dom';

function LivroDetalhe() {
  //const { books, setBooks } = useContext(AppContext);
  const location = useLocation();
  const { data } = location.state || {};

  return (
    <div className="text-gray-600 p-6 mt-24 mx-16 pb-12">
      <div className="w-full h-screen overflow-hidden rounded-md lg:aspect-none flex gap-14">
        <img
            src={data.imageSrc}
            alt={data.imageAlt}
            className="lg:w-1/4 lg:h-1/2 md:h-1/3 bg-gray-500 group-hover:opacity-75 cursor-pointer"
          />

        <div>
          <div className="flex items-center gap-10">
            <h2 className='text-gray-700 font-bold text-4xl'>
              {data.titulo}
            </h2>
            <p className="text-gray-500 font-medium text-lg">
              Ano {data.ano}
            </p>
          </div>

          <p className="my-2">
            Autor(a) {data.autor}
          </p>

          <div className="flex flex-col">
            <p className="border-b-2 pb-4 text-sm text-gray-500">
              Gênero(s): {data.categoria}
            </p>
            <p className="pt-8">
              {data.sinopse}
            </p>
            Editora: {data.editora}
            Detalhes do produto:
            Edição: {data.edicao}
            ISBN: {data.ISBN}
            Páginas:{data.numeroPaginas}
            Dimensões:{data.dimensoes}
          </div>
        </div>

        <p className="font-bold text-lg text-gray-800">
          Comprar por R${data.precificacao}
        </p>
          
      </div>
    </div>
  )
}

export default LivroDetalhe