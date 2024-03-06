import { BrowserRouter, Routes, Route } from "react-router-dom";
import Livros from './components/navegacao/Livros'
import Header from './components/Header/Header'
import Login from './components/Login/Login';
import Provider from './context/Provider';
import Carrinho from "./components/Carrinho/Carrinho";

function App() {

  return (
    <>
      <div className="bg-white mx-auto">
        <Provider>
          <BrowserRouter>
            <Header/>

            <Routes>
              <Route path="/" element={<Livros/>}/>
              <Route path="/login/*" element={<Login />} />
            </Routes>

            <Carrinho/>
          </BrowserRouter>
        </Provider>
      </div>
    </>
  )
}

export default App