/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

function MsgCompraEfetuada({ isOpen, setModalOpen }) {

  if (isOpen) {
    return (
      <div className="text-gray-800 bg-opacity-85 bg-gray-600 fixed inset-0 z-50 flex">
        <div className="h-1/3 max-w-xl w-full mx-auto my-auto bg-white rounded-lg">
        
        <div className="mx-10 flex flex-col items-center">
          <h2 className="text-2xl font-medium text-lime-600 text-center pt-16">
            Compra efetuada com sucesso!
          </h2>

          <div className="flex gap-4 mt-2">
            <Link to="/conta" onClick={setModalOpen}>
              <p className="text-blue-700 hover:text-blue-800">Ver pedido </p>
            </Link> |
            <Link to="/" onClick={setModalOpen}>
              <p className="text-blue-700 hover:text-blue-800">Ir ao menu inicial</p>
            </Link>
          </div>
        </div>

        </div>
      </div>
    )
  }
}

export default MsgCompraEfetuada