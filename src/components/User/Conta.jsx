import { useContext, useState } from "react";
import { useLocation } from 'react-router-dom';

import Pedidos from "./Pedidos";
import Cartoes from "./Cartoes";
import Dados from "./Dados";
import AppContext from "../../context/AppContext";
import Vendas from "../Admin/Vendas";
import Clientes from "../Admin/Clientes";
import Estoque from "../Admin/Estoque";
import Grafico from '../Admin/Grafico';

const navigationPerfil = [
  { name: 'Seus pedidos', href: 'Pedidos', current: false },
  { name: 'Seus dados', href: 'Dados', current: false },
  { name: 'Suas formas de pagamento', href: 'Cartoes', current: false },
  { name: 'Sair', href: 'Sair', current: false },
]

const navigationAdmin = [
  { name: 'Vendas realizadas', href: 'Vendas', current: false },
  { name: 'Clientes cadastrados', href: 'Clientes', current: false },
  { name: 'Livros - Estoque', href: 'Estoque', current: false },
  { name: 'Gráfico', href: 'Grafico', current: false },
  { name: 'Sair', href: 'Sair', current: false },
]

const componenteMapping = {
  'Pedidos': Pedidos,
  'Dados': Dados,
  'Cartoes': Cartoes,
  'Vendas': Vendas,
  'Clientes': Clientes,
  'Estoque': Estoque,
  'Grafico': Grafico,
};

function Conta() {
  const [ navigation, setNavigation ] = useState(null);
  const { userLogout } = useContext(AppContext);
  const localizacao = useLocation();

  const navigationArray = localizacao.pathname === '/admin' ? navigationAdmin : navigationPerfil;

  const renderizaComponente = () => {
    const Componente = componenteMapping[navigation];
    return Componente ? <Componente /> : null;
  };
  
  return (
    <div className="text-gray-800 py-12">
      <h2 className="text-2xl font-medium tracking-tight text-gray-800">Seu Perfil</h2>

      <section className="p-6 pb-14 flex gap-12 bg-gray-100 rounded-md my-6">
        <div className="flex flex-col border-r-2 border-gray-300 pr-8 items-start">
          {navigationArray.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                if (item.href === 'Sair') userLogout();
                setNavigation(`${item.href}`);
              }}
              className="text-gray-600 hover:bg-gray-700 hover:text-white rounded-md p-3 text-center text-sm font-medium pt-4"
            >
              {item.name}
            </button>
          ))}
        </div>
        
        {renderizaComponente()}
      </section>
    </div>
  )
}

export default Conta