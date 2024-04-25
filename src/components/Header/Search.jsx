import AppContext from '../../context/AppContext';
import { useContext, useState } from 'react';
import Erro from '../Erro';

function Search() {

    const [searchValue, setSearchValue] = useState("");
    const { listarEntidades, listarLivrosByNome, erro } = useContext(AppContext);

    const handleSearch = async (event) => {
        event.preventDefault();

        if (searchValue === '') {
            listarEntidades("livros");
        } else {
            listarLivrosByNome(searchValue);
        }
        setSearchValue("");
    }

    return (
        <>
        <div className="flex gap-2">
            <input required type="text" placeholder="Buscar livro" className="text-gray-800 w-80 rounded-md border-1 shadow-md shadow-slate-200 border-zinc-400" onChange={(event) => setSearchValue(event.target.value)} value={searchValue}/>
            <button className="text-gray-100 bg-indigo-600 p-2 pl-4 pr-4 rounded-lg" onClick={handleSearch}>
                Buscar
            </button>
            
            <Erro erro={erro}/>
        </div>
        </>
    )
}

export default Search