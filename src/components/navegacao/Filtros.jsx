/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';

function Filtros({ applyFilters }) {
  const [appliedFilters, setAppliedFilters] = useState([]);
  const { listarEntidades } = useContext(AppContext);
  const [minPages, setMinPages] = useState(500);
  const [filtroPreco, setFiltroPreco] = useState(50);

  useEffect(() => {
    const fetchData = async () => {
      const filtros = await listarEntidades("filtros");
      setAppliedFilters(filtros);
    };
    fetchData();
  }, []);

  const handleFilterChange = (sectionId, optionIdx) => {
    const updatedFilters = appliedFilters.map(filtro => {
      if (filtro.id === sectionId) {
        return {
         ...filtro,
          options: filtro.options.map((option, idx) => {
            if (idx === optionIdx) {
              return { ...option, checked: !option.checked };
            }
            return option;
          }),
        };
      }
      return filtro;
    });
    setAppliedFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  const handleMinPagesChange = (event) => {
    const value = parseInt(event.target.value);
    setMinPages(value);
  
    const updatedFilters = appliedFilters.map((filtro) => {
      if (filtro.id === 'numeroPaginas') {
        return {
          ...filtro,
          options: filtro.options.map((option) => {
            return {
              ...option,
              checked: parseInt(option.value) <= value,
            };
          }),
        };
      }
      return filtro;
    });

    setAppliedFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  const handlePriceRangeChange = (event) => {
    const value = parseFloat(event.target.value);
    setFiltroPreco(value);
  
    const updatedFilters = appliedFilters.map((filtro) => {
      if (filtro.id === 'precificacao') {
        return {
          ...filtro,
          options: filtro.options.map((option) => {
            return {
              ...option,
              checked: parseFloat(option.value) <= value,
            };
          }),
        };
      }
      return filtro;
    });
    setAppliedFilters(updatedFilters);
    applyFilters(updatedFilters);
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mr-20">
        <h1 className="text-lg font-medium tracking-tight text-gray-800">Mais filtros</h1>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <form className="hidden lg:block">
            {appliedFilters.map((filtro) => (
              <div key={filtro.id} className="border-b border-gray-200 py-6">
                <>
                  <h3 className="-my-3 flow-root">
                    <span className="font-medium text-gray-800">{filtro.name}</span>
                  </h3>
                  <div className="mt-6">
                    {filtro.id === 'numeroPaginas' || filtro.id === 'precificacao' ? (
                      filtro.id === 'numeroPaginas' ? (
                        <div className=" mt-3 w-full h-full">
                        <input
                          id="minPages"
                          type="range"
                          min="250"
                          max="1000"
                          step="10"
                          value={minPages}
                          onChange={handleMinPagesChange}
                          className="rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <label className="text-gray-500">
                          Até {minPages} páginas
                        </label>
                      </div>
                        ) : (
                          <>
                            <input
                              id="priceRange"
                              type="range"
                              min="25"
                              max="100"
                              step="5"
                              value={filtroPreco}
                              onChange={handlePriceRangeChange}
                              className="h-8 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <p className="text-gray-500">Até R${filtroPreco}</p>
                          </>
                        )
                    ) : (
                      filtro.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex items-center mt-3">
                          <input
                            id={`filter-${filtro.id}-${optionIdx}`}
                            name={`${filtro.id}[]`}
                            defaultValue={option.value}
                            type="checkbox"
                            checked={option.checked}
                            onChange={() => handleFilterChange(filtro.id, optionIdx)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-${filtro.id}-${optionIdx}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))
                    )}
                  </div>
                </>
              </div>
            ))}
          </form>
        </section>
      </div>
    </div>
  );
}

export default Filtros;
