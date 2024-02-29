const products = [
    {
        id: 1,
        imageSrc: 'https://books.google.com.br/books/publisher/content?id=WZ32DQAAQBAJ&hl=pt-BR&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U1c_unNkrrNgX9OX_wZTvFzxeBsrg&w=1280',
        imageAlt: "Capa do livro XX",
        autor: "Blake Crouch",
        categoria: [
            "Ficção científica",
            "Romance",
            "Suspense",
            "Romance psicológico"
        ],
    ano: 2016,
    titulo: "materia escura",
    editora: "Intriseca",
    edicao: "edicao teste",
    ISBN: "22222",
  numeroPaginas: "391",
  sinopse: "Ficção científica eletrizante de Blake Crouch aborda realidades alternativas, caminhos não percorridos e questiona: você é feliz com a vida que tem?",
  dimensoes: "altura, largura, peso, profundidade",
  precificacao: 39.90,
    },
    {
        id: 2,
        imageSrc: 'https://books.google.com.br/books/publisher/content?id=WZ32DQAAQBAJ&hl=pt-BR&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U1c_unNkrrNgX9OX_wZTvFzxeBsrg&w=1280',
        imageAlt: "Capa do livro XX",
        autor: "Blake Crouch",
        categoria: [
            "Ficção científica",
            "Romance",
            "Suspense",
            "Romance psicológico"
        ],
    ano: 2016,
    titulo: "materia escura",
    editora: "Intriseca",
    edicao: "edicao teste",
    ISBN: "22222",
  numeroPaginas: "391",
  sinopse: "Ficção científica eletrizante de Blake Crouch aborda realidades alternativas, caminhos não percorridos e questiona: você é feliz com a vida que tem?",
  dimensoes: "altura, largura, peso, profundidade",
  precificacao: 39.90,
    },
  ]

function Livros() {  
    return (
      <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Descubra nossos livros disponíveis</h2>
  
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative p-10 pb-2 pt-3 rounded-md border-2 shadow-lg shadow-slate-200">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full bg-gray-500 group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                        {product.titulo}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.autor}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">R${product.precificacao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </>
    )
  }
  
  export default Livros
  