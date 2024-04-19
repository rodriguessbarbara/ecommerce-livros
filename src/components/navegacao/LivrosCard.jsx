/* eslint-disable react/prop-types */
import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import { useNavigate } from "react-router-dom";

function LivrosCard({ data, filtros }) {
  const { id, imageSrc, imageAlt, capaAlternativa, titulo, autor, precificacao, ativo } = data;
  const { carrinhoItens, setCarrinhoItens, isCapaAlternativa, setIsCapaAlternativa, setIsCarrinhoAtivo } = useContext(AppContext);

  const navigate = useNavigate();

  const handleAddCarrinho = () => {
    const itemExistente = carrinhoItens.find(item => item.id === id);
    
    if (itemExistente) {
      if (itemExistente.quantidadeCarrinho < data.quantidade) {
        setCarrinhoItens(carrinhoItens.map(item =>
          item.id === id ? { ...item, quantidadeCarrinho: item.quantidadeCarrinho + 1 } : item
        ));
      }
    } else {
       setCarrinhoItens([...carrinhoItens, { ...data, quantidadeCarrinho: 1 }]);
    }
   }

  const handleCapaAlternativa = () => {
    setIsCapaAlternativa([ ...isCapaAlternativa, id ]);
  }

  const handleCapaOriginal = () => {
    if (isCapaAlternativa.includes(id)) {
      setIsCapaAlternativa(isCapaAlternativa.filter(item => item !== id));
    }
  };

  const handleClickLivro = () => {
    setIsCarrinhoAtivo(false);
    navigate('/livro', {
      state: {
        data: data,
      }
    });
  };

  const meetsFilterCriteria = () => {
    return filtros.every(filter => {
      // Se não houver filtro marcado, o livro passa no critério
      if (!filter.options.some(option => option.checked)) return true;
      // Verifica se o valor do livro corresponde a alguma opção marcada para o filtro atual
      return filter.options.some(option => option.checked && data[filter.id] === option.value);
    });
  };

  if (!meetsFilterCriteria()) return null;

  return (
    <>
      <div key={id} className="group relative p-10 pb-2 pt-3 rounded-md border-2 shadow-md shadow-slate-200">
        <div className="w-full overflow-hidden rounded-md lg:aspect-none">
          <img
            src={isCapaAlternativa.includes(id) ? `${capaAlternativa}` : `${imageSrc}`}
            alt={imageAlt}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full bg-gray-500 group-hover:opacity-75 cursor-pointer"
            onClick={handleClickLivro}
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
              {titulo.charAt(0).toUpperCase() + titulo.slice(1).toLowerCase()}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{autor}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">R${precificacao}</p>
        </div>

        <button
          type="submit"
          className={`text-white rounded-md ml-4 mt-2 p-4 ${data.ativo ? 'bg-indigo-800' : 'bg-gray-500'}`}
          onClick={handleAddCarrinho}
          disabled={!ativo}
        >
          Adicionar ao carrinho
        </button>
        {(!ativo) && <p className="text-red-500 font-medium">Indisponível</p>}

      </div>
    </>
  );
}

export default LivrosCard;