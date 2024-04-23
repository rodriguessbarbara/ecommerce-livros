/* eslint-disable react/prop-types */
import { useState } from 'react';

const filtros = [
  {
    id: 'editora',
    name: 'Editora',
    options: [
      { value: 'Intriseca', label: 'Intriseca', checked: false },
      { value: 'Record', label: 'Record', checked: false },
      { value: 'arqueiro', label: 'arqueiro', checked: false },
      { value: 'Bertrand', label: 'Bertrand', checked: false },
      { value: 'Paralela', label: 'Paralela', checked: false },
    ],
  },
  {
    id: 'LivroCategoria',
    name: 'Categoria',
    options: [
      { value: 'Romance', label: 'Romance', checked: false },
      { value: 'Suspense', label: 'Suspense', checked: false },
      { value: 'Ficcao', label: 'Ficcao', checked: false },
      { value: 'Terror', label: 'Terror', checked: false },
      { value: 'Aventura', label: 'Aventura', checked: false },
    ],
  },
  {
    id: 'autor',
    name: 'Autor',
    options: [
      { value: 'Blake Crouch', label: 'Blake Crouch', checked: false },
      { value: 'Ashley Audrain', label: 'Ashley Audrain', checked: false },
      { value: 'Carla Madeira', label: 'Carla Madeira', checked: false },
      { value: 'Stephen Chbosky', label: 'Stephen Chbosky', checked: false },
      { value: 'Isabel Allende', label: 'Isabel Allende', checked: false },
    ],
  },
  {
    id: 'edicao',
    name: 'Edicao',
    options: [
      { value: 'Portugues', label: 'Portugues', checked: false },
      { value: 'Inglês', label: 'Inglês', checked: false },
    ],
  },
]

function Filtros({ applyFilters }) {
  const [appliedFilters, setAppliedFilters] = useState(filtros);

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
  }

  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mr-20">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-2 pt-4 ">
            <h1 className="text-lg font-medium tracking-tight text-gray-800">Mais filtros</h1>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <form className="hidden lg:block">
                {appliedFilters.map((filtro) => (
                  <div key={filtro.id} className="border-b border-gray-200 py-6">
                    <>
                      <h3 className="-my-3 flow-root">
                        <span className="font-medium text-gray-800">{filtro.name}</span>
                      </h3>
                      <div className="mt-6">
                        {filtro.options.map((option, optionIdx) => (
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
                        ))}
                      </div>
                    </>
                  </div>
                ))}
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Filtros;
