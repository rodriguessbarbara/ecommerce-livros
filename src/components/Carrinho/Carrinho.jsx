import CarrinhoItem from "./CarrinhoItem"

function Carrinho() {
  //const [open, setOpen] = useState(true)

  return (
    <div className="bg-white w-full max-w-80 h-screen fixed top-0 right-0 px-4">
      
      <div className="flex content-between justify-between">
        <h2 className="text-lg font-medium text-gray-800 pt-5 pb-8">
          Carrinho de compras
        </h2>
        <button className="text-gray-400 font-medium">
          X
        </button>
      </div>

      <CarrinhoItem>

      </CarrinhoItem>
        
      <div className="border-t-2 border-gray-200 py-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>$62.00</p>
          </div>
          <div className="mt-6">
            <a
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Finalizar compra
            </a>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          </div>
      </div>

      </div>
  )
}

export default Carrinho