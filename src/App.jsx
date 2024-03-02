import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Livros from './components/navegacao/Livros'
import Header from './components/Header/Header'
import Login from './components/Login/Login';

function App() {
  const [valorDaBusca, setValorDaBusca] = useState("");

  return (
    <>
      <div className="bg-white mx-auto">
        <BrowserRouter>
          <Header searchValue={valorDaBusca} setSearchValue={setValorDaBusca}/>

          <Routes>
            <Route path="/" element={<Livros/>} searchValue={valorDaBusca}/>
            <Route path="/login/*" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App