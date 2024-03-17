import { Link } from "react-router-dom"

function MsgCompraEfetuada() {
  return (
    <div className="min-h-screen sm:max-w-6xl mx-auto pb-24 flex flex-col text-gray-800 sm:mt-24">
        <h2 className="text-2xl font-medium text-lime-600 pt-5 pb-4">
            Compra efetuada com sucesso!
        </h2>
        <Link to="/">
          <p className="hover:text-blue-800">Voltar ao menu principal.</p>
        </Link>
    </div>
  )
}

export default MsgCompraEfetuada