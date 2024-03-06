function CarrinhoItem() {

  return (
    <>
      <section className="flex flex-start border-b-2 border-gray-300 pb-5 mb-2 relative">
        <div className="border-2 border-gray-200 rounded-lg">
          <img src="https://books.google.com.br/books/publisher/content?id=WZ32DQAAQBAJ&hl=pt-BR&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U1c_unNkrrNgX9OX_wZTvFzxeBsrg&w=1280"
          alt="Imagem do livro"
          className="p-2 max-w-16 w-full h-full"/>
          
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <a href="">titulo livro</a>
              </h3>
              <p className="ml-4">R$45.0</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">capa</p>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500">Qty 1</p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
        </section>
    </>

  )
}

export default CarrinhoItem