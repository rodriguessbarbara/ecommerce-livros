import { useContext } from "react";
import AppContext from "../../context/AppContext";
import Input from "../Input";

function UpdateLivroForm() {
  const { books, selectedBook, setSelectedBook } = useContext(AppContext);

  return (
    <form>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-4 py-4">
        <div>
          <label className="text-sm font-medium text-gray-900">
              Livro
          </label>
          
          <select
          name="livro"
          required
          onChange={(event) => {setSelectedBook(event.target.value)}}
          className="w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6">
            {books.map((book) => (
              <option key={book.id} value={book.id} className="text-gray-800">
                {book.titulo}
              </option>
            ))}
          </select>
        </div>

        <Input label="Novo Título" type="text" name="titulo" span="2" />
        <Input label="Novo Autor" type="text" name="autor" span="2" />
        <Input label="Nova Categoria" type="text" name="categoria" span="2" />
        <Input label="Nova Editora" type="text" name="editora" span="2" />
        <Input label="Novo Ano" type="number" name="ano" />
        <Input label="Nova Edição" type="text" name="ediccao" />
        <Input label="Novo ISBN" type="number" name="isbn" />
        <Input label="Novo Num. páginas" type="number" name="num-paginas" />
        <div className="sm:col-span-4">
          <label className="text-sm font-medium text-gray-900">
            Nova Sinopse
          </label>
          <textarea name="sinopse" type="text"  className="sm:col-span-4 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"/>
        </div>
        <Input label="Nova Altura" type="number" name="altura" />
        <Input label="Nova Largura" type="number" name="largura" />
        <Input label="Novo Peso" type="number" name="peso" />
        <Input label="Nova Profundidade" type="number" name="profundidade" />
        <Input label="Nova Precificação" type="number" name="precificacao" span="2" />
        <Input label="Novo Código Barra" type="number" name="cod-barras"  span="2"/>
      </div>

      <button
        className="mt-10 flex w-full justify-center rounded-md bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Salvar
      </button>
    </form>
  )
}

export default UpdateLivroForm;