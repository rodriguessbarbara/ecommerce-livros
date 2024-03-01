function Search({ searchValue, setSearchValue }) {
    const valorDaBusca = searchValue;
    const setValorDaBusca = setSearchValue;
    // console.log(valorDaBusca)

    return (
        <>
        <div className="flex gap-2">
            <input type="text" className="rounded-md"/>
            <button className="text-gray-100 bg-blue-800 p-2 rounded-lg" onClick={(event) => setValorDaBusca(event.target.value)} value={valorDaBusca}>
                Buscar
            </button>
        </div>
        </>
    )
}

export default Search