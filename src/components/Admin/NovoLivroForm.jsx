/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import Input from "../Input";

function NovoLivroForm({ setModalOpen }) {
  const { novoLivro } = useContext(AppContext);
  const [data, setData] = useState({
    imageSrc: "",
    capaAlternativa: "",
    titulo: "",
    autor: "",
    categoria: "",
    editora: "",
    ano: "",
    edicao: "",
    ISBN: "",
    numeroPaginas: 0,
    sinopse: "",
    dimensoes: "",
    precificacao: 0,
    quantidade: 0,
    ativo: true,
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleNovoLivro = async (event) => {
    event.preventDefault();
    const isFormValid = Object.values(data).every(val => {
      if (typeof val !== 'number') {
        return val !== "";
      }
    });

    if (isFormValid) {
      await novoLivro(data)

      setData({
        imageSrc: "",
        capaAlternativa: "",
        titulo: "",
        autor: "",
        categoria: "",
        editora: "",
        ano: "",
        edicao: "",
        ISBN: "",
        numeroPaginas: 0,
        sinopse: "",
        dimensoes: "",
        precificacao: 0,
        quantidade: 0
      });
    }

    setModalOpen();
  };

  return (
    <form onSubmit={handleNovoLivro}>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-4 py-4">
        <Input label="Capa Original" type="text" name="imageSrc" span="2" required value={data.imageSrc} onChange={handleInput}/>
        <Input label="Capa alternativa" type="text" name="capaAlternativa" span="2" required value={data.capaAlternativa} onChange={handleInput}/>
        <Input label="Título do livro" type="text" name="titulo" span="2" required value={data.titulo.toLowerCase()} onChange={handleInput}/>
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
        
        <Input label="Dimensões" type="text" name="dimensoes" required value={data.dimensoes} onChange={handleInput}/>

        {/* <Input label="Altura" type="text" name="altura" required value={data.altura} onChange={handleInput}/>
        <Input label="Largura" type="text" name="largura" required value={data.largura} onChange={handleInput}/>
        <Input label="Peso" type="text" name="peso" required value={data.peso} onChange={handleInput}/>
        <Input label="Profundidade" type="text" name="profundidade" required value={data.profundidade} onChange={handleInput}/> */}
        <Input label="Precificação" type="number" name="precificacao" span="2" required value={data.precificacao} onChange={handleInput} min="0"/>
        <Input label="Quantidade" type="number" name="quantidade"  span="2"required value={data.quantidade} onChange={handleInput} min="0"/>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-900">
              Status
            </label>
          <select defaultValue={data.ativo}
            name="ativo"
            required
            onChange={handleInput}
            className="rounded-md max-h-10 border-0 shadow-sm ring-1 px-2 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                <option key="ativo" value={true}>
                  Ativo
                </option>
                <option key="inativo" value={false}>
                  Inativo
                </option>
            </select>
          </div>
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