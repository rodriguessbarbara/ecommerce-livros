function Search({ searchValue, setSearchValue }) {

    return (
        <>
        <div className="flex gap-2">
            <input type="text" className="text-gray-800 w-80 rounded-md border-1 shadow-md shadow-slate-200 border-zinc-400" onChange={(event) => setSearchValue(event.target.value)} value={searchValue}/>
            <button className="text-gray-100 bg-blue-800 p-2 pl-4 pr-4 rounded-lg">
                Buscar
            </button>
        </div>
        </>
    )
}

export default Search