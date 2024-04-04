/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import Input from "../Input";

function NovoLivroForm({ setModalOpen }) {
  const { books, setBooks } = useContext(AppContext);
  const [data, setData] = useState({
    titulo: "",
    autor: "",
    categoria: "",
    editora: "",
    ano: "",
    edicao: "",
    ISBN: "",
    numeroPaginas: 0,
    sinopse: "",
    altura: "",
    largura: "",
    peso: "",
    profundidade: "",
    precificacao: 0,
    quantidade: 0,
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleNovoLivro = (event) => {
    event.preventDefault();
    const isFormValid = Object.values(data).every(val => {
      if (typeof val !== 'number') {
        return val !== "";
      }
    });

    if (isFormValid) {
      setBooks([...books, data]);
      setData({
        titulo: "",
        autor: "",
        categoria: "",
        editora: "",
        ano: "",
        edicao: "",
        ISBN: "",
        numeroPaginas: 0,
        sinopse: "",
        altura: "",
        largura: "",
        peso: "",
        profundidade: "",
        precificacao: 0,
        quantidade: 0
      });
    }

    setModalOpen();
  };

  return (
    <form onSubmit={handleNovoLivro}>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-4 py-4">
        <Input label="Título do livro" type="text" name="titulo" span="2" required value={data.titulo} onChange={handleInput}/>
        <Input label="Autor" type="text" name="autor" span="2" required value={data.autor} onChange={handleInput}/>
        <Input label="Categoria" type="text" name="categoria" span="2" required value={data.categoria} onChange={handleInput}/>
        <Input label="Editora" type="text" name="editora" span="2" required value={data.editora} onChange={handleInput}/>
        <Input label="Ano" type="text" name="ano" required value={data.ano} onChange={handleInput}/>
        <Input label="Edição" type="text" name="edicao" required value={data.edicao} onChange={handleInput}/>
        <Input label="ISBN" type="text" name="ISBN" required value={data.ISBN} onChange={handleInput}/>
        <Input label="Num. páginas" type="number" name="numeroPaginas" required value={data.numeroPaginas} onChange={handleInput} min="0"/>
        <div className="sm:col-span-4">
          <label className="text-sm font-medium text-gray-900">
            Sinopse
          </label>
          <textarea name="sinopse" type="text" value={data.sinopse} onChange={handleInput}
          required
          className="sm:col-span-4 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"/>
        </div>
        <Input label="Altura" type="text" name="altura" required value={data.altura} onChange={handleInput}/>
        <Input label="Largura" type="text" name="largura" required value={data.largura} onChange={handleInput}/>
        <Input label="Peso" type="text" name="peso" required value={data.peso} onChange={handleInput}/>
        <Input label="Profundidade" type="text" name="profundidade" required value={data.profundidade} onChange={handleInput}/>
        <Input label="Precificação" type="number" name="precificacao" span="2" required value={data.precificacao} onChange={handleInput} min="0"/>
        <Input label="Quantidade" type="number" name="quantidade"  span="2"required value={data.quantidade} onChange={handleInput} min="0"/>
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