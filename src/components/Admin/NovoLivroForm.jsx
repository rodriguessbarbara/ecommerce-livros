/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import Input from "../Input";
import Erro from '../Erro'
import Loading from "../Loading";

function NovoLivroForm({ setModalOpen }) {
  const { criarEntidade, listarEntidades, erro, loading } = useContext(AppContext);
  const [todasCategorias, setTodasCategorias] = useState(null);

  const [data, setData] = useState({
    imageSrc: "",
    capaAlternativa: "",
    titulo: "",
    autor: "",
    categorias: [],
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
    palavraChave: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const categorias = await listarEntidades("categorias");

      const categoriasMap = categorias.reduce((acc, categoria) => {
        acc[categoria.nome] = categoria.id;
        return acc;
      }, {});
      setTodasCategorias(categoriasMap);      }
    fetchData();
  }, []);
  
  const handleInput = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleInputSelect = (event) => {
    const { name, options } = event.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
  
    setData({ ...data, [name]: selectedOptions });
  };

  const handleNovoLivro = async (event) => {
    const categoriasSelecionadas = data.categorias.map(nomeCategoria => todasCategorias[nomeCategoria]);

    event.preventDefault();
    await criarEntidade({
      imageSrc: data.imageSrc,
      capaAlternativa: "",
      titulo: data.titulo,
      autor: data.autor,
      categorias: categoriasSelecionadas,
      editora: data.editora,
      ano: data.ano,
      edicao: data.edicao,
      ISBN: data.ISBN,
      numeroPaginas: data.numeroPaginas,
      sinopse: data.sinopse,
      dimensoes: data.dimensoes,
      precificacao: data.precificacao,
      quantidade: data.quantidade,
      ativo: data.ativo,
      palavraChave: data.palavraChave,
  }, "livros")

    setData({
      imageSrc: "",
      capaAlternativa: "",
      titulo: "",
      autor: "",
      categorias: [],
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
      palavraChave: "",
    });
    setModalOpen();
  };

  if (loading) return <Loading/>
  return (
    <form onSubmit={handleNovoLivro}>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-4 py-4">
        <Input label="Capa Original" type="text" name="imageSrc" span="2" required value={data.imageSrc} onChange={handleInput}/>
        <Input label="Título do livro" type="text" name="titulo" span="2" required value={data.titulo.toLowerCase()} onChange={handleInput}/>
        <Input label="Autor" type="text" name="autor" span="2" required value={data.autor} onChange={handleInput}/>

        <div>
          <label className="text-sm font-medium text-gray-900">Categoria(s)</label>
          <select 
            className="w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
            name="categorias"
            id="categorias" 
            value={data.categorias}
            onChange={handleInputSelect}
            multiple
            required
          >
            <option value="Romance">Romance</option>
            <option value="Suspense">Suspense</option>
            <option value="Ficcao Cientifica">Ficção Cientifica</option>
            <option value="Ficcao">Ficcao</option>
            <option value="Terror">Terror</option>
            <option value="Aventura">Aventura</option>
          </select>
        </div>
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

        <Input label="Palavras-chave" type="text" name="palavraChave" span="4" required value={data.palavraChave} onChange={handleInput}/>
    </div>

      <button
      className="mt-6 flex w-full justify-center rounded-md bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm hover:bg-indigo-700"
      >
        Salvar
      </button>

      <Erro erro={erro}/>
    </form>
  )
}

export default NovoLivroForm;