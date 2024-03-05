import { Disclosure } from '@headlessui/react'
import Search from './Search'
import { useNavigate } from "react-router-dom";
import Carrinho from '../navegacao/Carrinho';

const navigation = [
  { name: 'Login/Criar', href: './login', current: false },
]


function Header({ searchValue, setSearchValue }) {
  const navigate = useNavigate();

  async function handleClick(event) {
    event.preventDefault();
    navigate("/");
  }

  return (
    <Disclosure as="nav" className="bg-white">
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-between">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-auto cursor-pointer"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Livros" onClick={handleClick}
                />
              </div>

                <Search searchValue={searchValue} setSearchValue={setSearchValue}/>

              <div className="hidden sm:ml-6 sm:block">
                <div className="flex around space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-gray-600 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}

                  <Carrinho/>
                </div>
              </div>

            </div>
          </div>
        </div>
      </>
    </Disclosure>
  )
}

export default Header