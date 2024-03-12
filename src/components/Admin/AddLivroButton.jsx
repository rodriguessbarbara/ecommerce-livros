import { useState } from "react";
import AddLivroCard from "./AddLivroCard";

function AddLivroButton() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="absolute bottom-8 right-10 mr-4">
        <button 
          onClick={() => setOpenModal(true)}
          className="rounded-full bg-red-700 border border-transparent text-white font-bold text-2xl pt-2 pb-4 px-5">
            +
        </button>

      </div>
      
      <AddLivroCard isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}/>
    </>
  )
}

export default AddLivroButton;