import AppContext from '../../context/AppContext';
import fetchBooks from '../../fetchBooks';
import { useContext, useState } from 'react';

function Search() {

    const [searchValue, setSearchValue] = useState("");
    const { setBooks } = useContext(AppContext);

    const handleSearch = async (event) => {
        event.preventDefault();

        const books = await fetchBooks(searchValue);
        
        setBooks(books);
        setSearchValue("");
    }

    return (
        <>
        <div className="flex gap-2">
            <input required type="text" placeholder="Buscar livro" className="text-gray-800 w-80 rounded-md border-1 shadow-md shadow-slate-200 border-zinc-400" onChange={(event) => setSearchValue(event.target.value)} value={searchValue}/>
            <button className="text-gray-100 bg-blue-800 p-2 pl-4 pr-4 rounded-lg" onClick={handleSearch}>
                Buscar
            </button>
        </div>
        </>
    )
}

export default Search