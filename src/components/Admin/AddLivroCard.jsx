import { useContext } from "react";
import AppContext from "../../context/AppContext";

function AddLivroCard({ isOpen, setModalOpen }) {
  const { books, setBooks } = useContext(AppContext);


  if (isOpen) {
    return (
      <div className="text-gray-800 p-8 bg-opacity-85 bg-gray-600	fixed top-0 bottom-0 left-0 right-0 z-50">
        <div className="block h-full max-w-4xl mx-auto my-auto bg-white rounded-lg text-gray-800">
          
          <div className="mx-10">
            <div className="cursor-pointer text-end pt-4 font-bold text-lg" onClick={setModalOpen}>
              X
            </div>

            <h3 className="text-lg font-medium text-gray-900">Adicionar novo livro</h3>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-4 ">
                <div className="sm:col-span-4">
                  <label className="text-sm font-medium text-gray-900">
                    Título
                  </label>
                    <input
                      type="text"
                      id="nome"
                      className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                      required
                    />
                </div>
            </div>

          </div>
          
        </div>
      </div>
    )
  }
}

export default AddLivroCard;