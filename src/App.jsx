import { useState } from 'react';
import Livros from './components/navegacao/Livros'
import Header from './components/Header/Header'

function App() {
  const [valorDaBusca, setValorDaBusca] = useState("");

  return (
    <>
      <div className="bg-white">
      <Header searchValue={valorDaBusca} setSearchValue={setValorDaBusca}/>
      <Livros searchValue={valorDaBusca}/>

      </div>
    </>
  )
}

export default App
