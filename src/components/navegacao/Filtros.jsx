const filters = [
  {
    id: 'editora',
    name: 'Editora',
    options: [
      { value: 'intriseca', label: 'intriseca', checked: false },
      { value: 'rocco', label: 'rocco', checked: false },
      { value: 'arqueiro', label: 'arqueiro', checked: false },
      { value: 'HarperCollins', label: 'HarperCollins', checked: true },
      { value: 'Galera', label: 'Galera', checked: false },
    ],
  },
  {
    id: 'categoria',
    name: 'Categoria',
    options: [
      { value: 'romance', label: 'romance', checked: false },
      { value: 'drama', label: 'drama', checked: false },
      { value: 'policial', label: 'policial', checked: true },
      { value: 'terror/thriller', label: 'terror/thriller', checked: false },
      { value: 'educação', label: 'educação', checked: false },
    ],
  },
  {
    id: 'autor',
    name: 'Autor',
    options: [
      { value: 'Blake Crouch', label: 'Blake Crouch', checked: false },
      { value: 'Ashley Audrain', label: 'Ashley Audrain', checked: false },
      { value: 'Carla Madeira', label: 'Carla Madeira', checked: false },
    ],
  },
]

function Filtros() {

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
                {filters.map((section) => (
                  <div key={section.id} className="border-b border-gray-200 py-6">
                
                      <>
                        <h3 className="-my-3 flow-root">
                            <span className="font-medium text-gray-800">{section.name}</span>
                        </h3>

                          <div className="mt-6">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center mt-3">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
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