import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    navigate("/");
  }

  return (
    <>
      <div className="justify-center py-12 mt-20 mx-10">
          <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-700">
            Acesse sua conta!
          </h2>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleLogin}
>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email
              </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />

            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-600">
                  Senha
                </label>
                <div className="text-sm">
                  <Link to="/login/esqueceuSenha"className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Esqueceu a senha?
                  </Link>
                </div>
              </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />
            </div>

            <div>
              <button className="flex w-full justify-center rounded-md bg-indigo-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Entrar
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            ou{' '}
            <Link to="/login/cadastro" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Cadastrar agora.
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginForm;