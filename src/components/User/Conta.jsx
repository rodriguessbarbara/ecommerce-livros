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

  const renderComponent = () => {
    const Component = componenteMapping[navigation]; // Obtém o componente correspondente ao valor de navigation
    return Component ? <Component /> : null; // Renderiza o componente se existir, caso contrário, retorna null
  };
  
  return (
    <div className="text-gray-800">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-2 pt-4 ">
        <h2 className="text-2xl font-medium tracking-tight text-gray-800">Seu Perfil</h2>
      </div>

      <section className="p-6 pb flex gap-10 bg-gray-200 rounded-md">
        <div className="flex flex-col border-r-2 border-gray-100 pr-8
        ">
          {navigationPerfil.map((item) => (
            <button key={item.name} onClick={() => setNavigation(`${item.href}`)}
            className="text-gray-600 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                {item.name}
            </button>
          ))}
        </div>

        <div>
          {renderComponent()}
        </div>         
      </section>
    </div>
  )
}

export default Conta