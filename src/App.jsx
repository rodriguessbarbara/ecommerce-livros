import { BrowserRouter, Routes, Route } from "react-router-dom";
import Livros from './components/navegacao/Livros'
import Header from './components/Header/Header'
import Login from './components/Login/Login';
import Provider from './context/Provider';
import CompraOverview from "./components/User/CompraOverview";
import LivroDetalhe from "./components/navegacao/LivroDetalhe";
import Usuario from "./components/User/Usuario";
import ProtectedRoute from "./ProtectedRoute";
import RedirectIfLoggedIn from './RedirectIfLoggedIn';
import Admin from "./components/Admin/Admin";
import Page404 from "./components/Page404";

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
              <Route path="/login/*" element={
                <RedirectIfLoggedIn>
                  <Login />
                </RedirectIfLoggedIn>
              } />
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
            <Route path="/*" element={<Page404/>}/>
            </Routes>

          </Provider>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App