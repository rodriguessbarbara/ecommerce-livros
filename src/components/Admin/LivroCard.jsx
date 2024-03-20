/* eslint-disable react/prop-types */
import NovoLivroForm from "./NovoLivroForm";

function LivroCard({ isOpen, setModalOpen }) {

  if (isOpen) {
    return (
      <div className="text-gray-800 p-8 bg-opacity-85 bg-gray-600	fixed top-0 bottom-0 left-0 right-0 z-50">
        <div className="h-full max-w-4xl mx-auto my-auto bg-white rounded-lg text-gray-800">
          
          <div className="mx-10">
            <div className="cursor-pointer text-end py-4 font-bold text-lg" onClick={setModalOpen}>
              X
            </div>

            <div className="flex justify-around text-gray-800 ">
              <button className="text-lg font-medium cursor-pointer bg-orange-400 rounded-lg p-4 hover:bg-orange-500">
                Cadastrar novo livro
              </button>
            </div>

            <NovoLivroForm/>

          </div>
        </div>
      </div>
    )
  }
}

export default LivroCard;