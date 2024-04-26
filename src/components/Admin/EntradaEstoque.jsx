/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import Input from "../Input";
import useForm from "../../hooks/useForm";

function EntradaEstoque({ setIsEntradaEstoque }) {
  const { books, setBooks, atualizarEntidade } = useContext(AppContext);
  const [selectedBook, setSelectedBook] = useState(books[0].id);
  const quantidadeEstoque = useForm();

  function handleAtualizaEstoque() {
    if (!selectedBook) return;
    const novaQuantidade = quantidadeEstoque;
    
    const updatedBooks = books.map(book => {
      if (book.id === parseInt(selectedBook)) {
        atualizarEntidade(book.id, {quantidade: parseInt(novaQuantidade.value)}, "livros")
        return { ...book, quantidade: parseInt(novaQuantidade.value) };
      }
      return book;
    });

    setBooks(updatedBooks);
    setSelectedBook(null);

    setIsEntradaEstoque()
  }

  return (
    <div className="text-gray-800 bg-opacity-85 bg-gray-600 fixed inset-0 z-50 flex">
      <div className="h-1/2 max-w-xl w-full mx-auto my-auto bg-white rounded-lg">
        <div className="mx-8 pt-4">
          <button className="font-bold border-2 border-green-600 hover:bg-green-100 rounded-lg px-2 float-end mt-2 mb-4" onClick={setIsEntradaEstoque}>
              X
          </button>
          <h3 className="text-2xl font-medium tracking-tight mt-2 mb-4">Entrada no estoque</h3>
        
        <form onSubmit={handleAtualizaEstoque}>
          <label className="text-sm font-medium text-gray-900">
            Livro
          </label>
          <select
          name="livro"
          required
          onChange={(event) => {setSelectedBook(event.target.value)}}
          className="w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
            {books.map((book) => (
              <option key={book.id} value={book.id} className="text-gray-800">
                {book.titulo}
              </option>
            ))}
          </select>
            
          <Input label="Quantidade de itens" type="number" min="0" name="quantidadeItens" {...quantidadeEstoque} required/>

        <button
          className="mt-6 flex w-full justify-center rounded-md bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Salvar
        </button>
        </form>

      </div>
      </div>
    </div>
  )
}

export default EntradaEstoque