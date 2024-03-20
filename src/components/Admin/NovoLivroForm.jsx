//import { useContext } from "react";
//import AppContext from "../../context/AppContext";
import Input from "../Input";

function NovoLivroForm() {
  //const { books, setBooks } = useContext(AppContext);

//  const handleNovoLivro = () => {
//    setBooks([ ...books, data ]);
// }

  return (
    <form type="submit">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-4 py-4">
        <Input label="Título do livro" type="text" name="titulo" span="2" required/>
        <Input label="Autor" type="text" name="autor" span="2" required/>
        <Input label="Categoria" type="text" name="categoria" span="2" required/>
        <Input label="Editora" type="text" name="editora" span="2" required/>
        <Input label="Ano" type="number" name="ano" required/>
        <Input label="Edição" type="text" name="ediccao" required/>
        <Input label="ISBN" type="number" name="isbn" required/>
        <Input label="Num. páginas" type="number" name="num-paginas" required/>
        <div className="sm:col-span-4">
          <label className="text-sm font-medium text-gray-900">
            Sinopse
          </label>
          <textarea name="sinopse" type="text" required className="sm:col-span-4 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"/>
        </div>
        <Input label="Altura" type="number" name="altura" required/>
        <Input label="Largura" type="number" name="largura" required/>
        <Input label="Peso" type="number" name="peso" required/>
        <Input label="Profundidade" type="number" name="profundidade" required/>
        <Input label="Precificação" type="number" name="precificacao" span="2" required/>
        <Input label="Código Barra" type="number" name="cod-barras"  span="2"required/>
    </div>

      <button
      className="mt-6 flex w-full justify-center rounded-md bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm hover:bg-indigo-700"
      >
        Salvar
      </button>
    </form>
  )
}

export default NovoLivroForm;