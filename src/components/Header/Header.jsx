import Search from './Search'
import { Link } from "react-router-dom";
import CarrinhoButton from './CarrinhoButton';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import { useLocation } from 'react-router-dom';
import { BookOpenIcon } from '@heroicons/react/24/outline'

function Header() {
  const { login, listarEntidades } = useContext(AppContext);
  const localizacao = useLocation();

return (
  <nav className="bg-white">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex flex-shrink-0 items-center">
            <Link to="/" onClick={() => {listarEntidades("livros")}}> 
              <BookOpenIcon className="h-8 w-8 text-indigo-700" aria-hidden="true" />
            </Link>
          </div>
        
          {localizacao.pathname === "/" && <Search/>}

          <div className="hidden sm:ml-6 sm:block">
            <div className="flex around space-x-4">
              {login ? (
                login === 'admin' ? (
                  <Link
                    to="/admin"
                    className="text-gray-600 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Admin
                  </Link>
                ) : (
                  <Link
                    to="/conta"
                    className="text-gray-600 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Perfil
                  </Link>
                )
              ) : (
                <Link
                  to="/login"
                  className="text-gray-600 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Login/Criar
                </Link>
              )}
              <CarrinhoButton/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
);
}

export default Header;