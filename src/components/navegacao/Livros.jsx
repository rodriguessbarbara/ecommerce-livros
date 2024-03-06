import { useEffect, useContext } from "react"
import fetchBooks from "../../fetchBooks";
import LivrosCard from "./LivrosCard";
import AppContext from "../../context/AppContext";

function Livros() {
  const { books, setBooks } = useContext(AppContext);

  useEffect(() => {
    fetchBooks("tudo").then((response) => {
      setBooks(response);
    });
  }, []);

    return (
      <>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Descubra nossos livros disponíveis</h2>
    
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {books.map((book) => (
                  <LivrosCard key={book.id} data={book}/>
                ))}
              </div>
          </div>
        </div>
      </>
    )
  }
  
  export default Livros
  