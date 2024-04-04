/* eslint-disable react/prop-types */
import NovoLivroForm from "./NovoLivroForm";

function LivroCard({ isOpen, setModalOpen }) {

  if (isOpen) {
    return (
      <div className="p-8 bg-opacity-85 bg-gray-600	fixed top-0 bottom-0 left-0 right-0 z-50">
        <div className="h-full max-w-4xl mx-auto my-auto bg-white rounded-lg text-gray-800">
          
          <div className="mx-10 pt-8">
            <div className="flex justify-between text-lg">
              <h2 className="text-2xl font-medium">Cadastrar novo livro</h2>
              <button className="font-bold border-2 border-green-600 hover:bg-green-100 rounded-lg px-2" onClick={setModalOpen}>
                X
              </button>
            </div>

            <NovoLivroForm setModalOpen={() => setModalOpen(!isOpen)}/>
          </div>

        </div>
      </div>
    )
  }
}

export default LivroCard;