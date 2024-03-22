import { useState } from "react";
import Pedidos from "./Pedidos";
import Cartoes from "./Cartoes";

const navigationPerfil = [
  { name: 'Seus pedidos', href: 'Pedidos', current: false },
  { name: 'Seus dados', href: 'Dados', current: false },
  { name: 'Suas formas de pagamento', href: 'Cartoes', current: false },
  { name: 'Sair', href: '/', current: false },
]

const componenteMapping = {
  'Pedidos': Pedidos,
  'Cartoes': Cartoes,
};

function Conta() {
  const [ navigation, setNavigation ] = useState(null);

  const renderizaComponente = () => {
    const Componente = componenteMapping[navigation];
    return Componente ? <Componente /> : null;
  };
  
  return (
    <div className="text-gray-800">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-2 pt-4 ">
        <h2 className="text-2xl font-medium tracking-tight text-gray-800">Seu Perfil</h2>
      </div>

      <section className="p-6 pb flex gap-10 bg-gray-100 rounded-md">
        <div className="flex flex-col border-r-2 border-gray-300 pr-8 items-start">
          {navigationPerfil.map((item) => (
            <button key={item.name} onClick={() => setNavigation(`${item.href}`)}
            className="text-gray-600 hover:bg-gray-700 hover:text-white rounded-md p-3 text-center text-sm font-medium pt-4">
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