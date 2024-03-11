import propTypes from 'prop-types';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';

function LivrosCard({data}) {
  const {id, imageSrc, imageAlt, capaAlternativa, titulo, autor, precificacao } = data
  const { carrinhoItens, setCarrinhoItens, isCapaAlternativa, setIsCapaAlternativa} = useContext(AppContext);


  const handleAddCarrinho = () => {
    setCarrinhoItens([ ...carrinhoItens, data ]);
  }

  const handleCapaAlternativa = () => {
    setIsCapaAlternativa([ ...isCapaAlternativa, id ]);
  }

  const handleCapaOriginal = () => {
    if (isCapaAlternativa.includes(id)) {
      setIsCapaAlternativa(isCapaAlternativa.filter(item => item !== id));
    }
  }

  return (
    <>
      <div key={id} className="group relative p-10 pb-2 pt-3 rounded-md border-2 shadow-md shadow-slate-200">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none">
          <img
            src={isCapaAlternativa.includes(id) ? `${capaAlternativa}` : `${imageSrc}`}
            alt={imageAlt}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full bg-gray-500 group-hover:opacity-75 cursor-pointer"
          />
          <div className="flex justify-around mt-2">
            <button
            className="text-gray-600 font-medium text-sm cursor-pointer"
            onClick={handleCapaOriginal}
            >
              original
            </button>
            <button
            className="text-gray-600 font-medium text-sm cursor-pointer"
            onClick={handleCapaAlternativa}
            >
              alternativa
            </button>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
                {titulo}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{autor}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">R${precificacao}</p>
        </div>
        <button
          type="submit"
          className="text-white bg-indigo-800 rounded-md ml-4 mt-2 p-2"
          onClick={handleAddCarrinho}
          >
            Adicionar ao carrinho
        </button>
      </div>
    </>
  )
}

export default LivrosCard;

LivrosCard.propTypes = {
  data: propTypes.shape({}),
}.isRequired;