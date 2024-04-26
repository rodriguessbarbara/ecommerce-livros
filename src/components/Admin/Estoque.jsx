import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import Search from "../Header/Search";
import EntradaEstoque from "./EntradaEstoque";
import Loading from "../Loading";

function Estoque() {
  const { books, setBooks, listarEntidades, atualizarEntidade, loading } = useContext(AppContext);
  const [isEntradaEstoque, setIsEntradaEstoque] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        await listarEntidades("livros");
      }
    fetchData();
  }, []);

  useEffect(() => {
    const hasBookInativo = books.some(book => book.quantidade === 0);
    if (hasBookInativo) {
      const updatedBooks = books.map(book => {
        if (book.quantidade === 0) {
          atualizarEntidade(book.id, {ativo: false}, "livros");

          return { ...book, ativo: false };
        }
        return book;
      });

      setBooks(updatedBooks);
    }
  }, [setBooks]);

  function handleMudaStatus(id, status) {
    const novoStatus = books.map(b => {
      if (b.id === id) {
        atualizarEntidade(id, {ativo: status}, "livros");

        return {...b, ativo: status}
      }
      return b
    });
    setBooks(novoStatus);
  }

  if (loading || !books) return <Loading/>
  return (
    <div className="py-4 text-gray-600 flex flex-col flex-grow">
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

      <table className="w-full table-auto mb-6 text-center">
        <thead>
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Livro</th>
            <th className="px-4 py-2">Autor</th>
            <th className="px-4 py-2">Estoque</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="border-2 rounded-md p-4 m-2">
              <td className="border p-4">{book.id}</td>
              <td className="border p-4">{book.titulo}</td>
              <td className="border p-4">{book.autor}</td>
              <td className="border p-4">{book.quantidade}</td>
              <td className="border p-4">
                {book.ativo ? <span className="text-green-600 font-medium">ativo</span> : <span className="text-red-600 font-medium">inativo</span>}
              </td>
              <td className="border p-4">
                <button 
                  className={`rounded font-medium statusCliente ${book.quantidade === 0 ? 'text-gray-400' : book.ativo ? `text-red-600 hover:text-red-700` : `text-green-600 hover:text-green-700`}`}
                  onClick={() => handleMudaStatus(book.id, !book.ativo)}
                  disabled={book.quantidade === 0}
                >
                  {book.quantidade === 0 ? (
                    "Sem estoque"
                  ) : (
                    book.ativo ? "Inativar cadastro" : "Ativar cadastro"
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Estoque