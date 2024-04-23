import { useState, useContext, useEffect } from "react";
import LivrosCard from "./LivrosCard";
import AppContext from "../../context/AppContext";
import Filtros from "./Filtros";
import AddLivroButton from "../Admin/AddLivroButton";
import Carrinho from "../Carrinho/Carrinho";

function Livros() {
  const { books, setBooks, login, listarLivros } = useContext(AppContext);
  const [appliedFilters, setAppliedFilters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        await listarLivros();
      }
    fetchData();
  }, [setBooks]);

  const applyFilters = (filtros) => {
    setAppliedFilters(filtros);
  };
  
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:mx-12 flex ">
          <Filtros applyFilters={applyFilters} />

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Descubra nossos livros disponíveis</h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {books.filter((book) => {
                  return appliedFilters.every((filtro) => {
                    if (!filtro.options.some((option) => option.checked)) return true;

                    if (filtro.id === 'LivroCategoria') {
                      return filtro.options.some(
                        (option) =>
                          option.checked &&
                          book.LivroCategoria.some(
                            (lc) => lc.Categorium.nome === option.value
                          )
                      );
                    } else {
                      return filtro.options.some(
                        (option) => option.checked && book[filtro.id] === option.value
                      );
                    }
                  });
                })
                .map((book) => (
                  <LivrosCard key={book.id} data={book} filtros={appliedFilters} />
                ))}
            </div>
          </div>

          {(login && login === 'admin') && <AddLivroButton />}
        </div>
      </div>

      <Carrinho/>
    </>
  );
}

export default Livros;
