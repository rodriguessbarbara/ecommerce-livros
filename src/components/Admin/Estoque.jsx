import { useContext, useEffect, useState } from "react";
import { fetchBooks } from "../../fetchData";
import AppContext from "../../context/AppContext";
import Search from "../Header/Search";
import EntradaEstoque from "./EntradaEstoque";

function Estoque() {
  const { books, setBooks } = useContext(AppContext);
  const [isEntradaEstoque, setIsEntradaEstoque] = useState(false);

  useEffect(() => {
    fetchBooks("tudo").then((response) => {
      setBooks(response);
    });
  }, [setBooks]);

  useEffect(() => {
    const hasBookInativo = books.some(book => book.quantidade === 0 && book.statusAtivo);
    if (hasBookInativo) {
      const updatedBooks = books.map(book => {
        if (book.quantidade === 0 && book.statusAtivo) {
          return { ...book, statusAtivo: false };
        }
        return book;
      });
      setBooks(updatedBooks);
    }
  }, [books, setBooks]);
  
  function handleMudaStatus(id, status) {
    const novoStatus = books.map(b => {
      if (b.id === id) {
        return {...b, statusAtivo: status}
      }
      return b;
    });

    setBooks(novoStatus);
  }

  return (
    <div className="border-b border-gray-200 py-4 text-gray-600 flex flex-col flex-grow">
      <div className="justify-between items-center mb-4 flex gap-2">
        <div>
          <h3 className="text-2xl font-medium tracking-tight">Livros e Estoque</h3>
          <h4 className="text-lg font-medium mb-2">consultar e gerenciar</h4>  
        </div>
        
        <Search/>
          
        <button onClick={() => setIsEntradaEstoque(true)} className="border-2 border-indigo-600 bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-md text-gray-200">
          Entrada estoque
        </button>
      </div>

      {isEntradaEstoque && <EntradaEstoque setIsEntradaEstoque={() => setIsEntradaEstoque(!isEntradaEstoque)} />}

      {books.map((book) => (
        <div key={book.id} className="border-2 rounded-md p-4 m-2">
          <p>Livro {book.titulo} - {book.autor}</p>
          <p>Itens em estoque: {book.quantidade}</p>
          <p>Status: {book.statusAtivo ? <span className="text-green-600 font-medium">ativo</span> : <span className="text-red-600 font-medium">inativo</span>}</p>

          <button 
            className={`my-2 rounded font-medium statusCliente ${book.quantidade === 0 ? 'text-gray-400' : book.statusAtivo ? `text-red-600 hover:text-red-700` : `text-green-600 hover:text-green-700`}`}
            onClick={() => handleMudaStatus(book.id, !book.statusAtivo)}
            disabled={book.quantidade === 0}
          >
            {book.quantidade === 0 ? (
              "Sem estoque"
            ) : (
              book.statusAtivo ? "Inativar cadastro" : "Ativar cadastro"
            )}

          </button>
        </div>
      ))}

    </div>
  )
}

export default Estoque