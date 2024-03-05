import propTypes from 'prop-types';

//const capaLivro = [
//  { name: 'Original', href: './', current: true },
//  { name: 'IA', href: './', current: false }
//]

function LivrosCard({data}) {
  const {id, imageSrc, imageAlt, titulo, autor, precificacao } = data

  return (
    <>
      <div key={id} className="group relative p-10 pb-2 pt-3 rounded-md border-2 shadow-md shadow-slate-200">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full bg-gray-500 group-hover:opacity-75 cursor-pointer"
          />
          <div className="flex justify-around mt-2">
            <a className="text-gray-600 text-sm cursor-pointer">original</a>
            <a className="text-gray-600 text-sm cursor-pointer">alternativa</a>
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
        <button type="submit" className="text-white bg-sky-600 rounded-md ml-4 mt-2 p-2">Adicionar ao carrinho</button>
      </div>
    </>
  )
}

export default LivrosCard;

LivrosCard.propTypes = {
  data: propTypes.shape({}),
}.isRequired;