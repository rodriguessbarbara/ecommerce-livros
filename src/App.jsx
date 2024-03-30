import { BrowserRouter, Routes, Route } from "react-router-dom";
import Livros from './components/navegacao/Livros'
import Header from './components/Header/Header'
import Login from './components/Login/Login';
import Provider from './context/Provider';
import Carrinho from "./components/Carrinho/Carrinho";
import CompraOverview from "./components/User/CompraOverview";
import LivroDetalhe from "./components/navegacao/LivroDetalhe";
import Usuario from "./components/User/Usuario";
import ProtectedRoute from "./ProtectedRoute";
import Admin from "./components/Admin/Admin";

function App() {

  return (
    <>
      <div className="bg-white mx-auto">
        <BrowserRouter>
          <Provider>
            <Header/>

            <Routes>
              <Route path="/" element={<Livros/>}/>
              <Route path="/livro" element={<LivroDetalhe/>}/>
              <Route path="/login/*" element={<Login />} />
              <Route path="/compra" element={<CompraOverview />} />
              <Route
                path="/conta/*"
                element={
                  <ProtectedRoute>
                    <Usuario />
                  </ProtectedRoute> }
                />
                <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute> }
                />

            </Routes>

            <Carrinho/>
          </Provider>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App