//import { useNavigate } from "react-router-dom";

function LoginCriar() {
  //const navigate = useNavigate();

  return (
    <>
      <div className="justify-center py-6 mt-10 mx-10">
          <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-700">
            Crie sua conta!
          </h2>

      <form className="mt-4 pt-6 sm:mx-auto sm:w-full sm:max-w-4xl border-t-2 border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Dados Pessoais</h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label className="text-sm font-medium text-gray-900">
                Nome
              </label>
                <input
                  type="text"
                  id="nome"
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                  required
                />
            </div>

            <div className="sm:col-span-3">
              <label className="text-sm font-medium text-gray-900">
                Sobrenome
              </label>
                <input
                  type="text"
                  id="sobrenome"
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                  required
                />
            </div>

            <div className="sm:col-span-3">
              <label className="text-sm font-medium text-gray-900">
                CPF
              </label>
                <input
                  type="text"
                  id="cpf"
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                  required
                />
            </div>

            <div className="sm:col-span-3">
              <label className="text-sm font-medium text-gray-900">
                Telefone
              </label>
                <input
                  type="tel"
                  id="telefone"
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                  required
                />
            </div>

            <div className="sm:col-span-full">
              <label className="text-sm font-medium text-gray-900">
                Endereço de email
              </label>
                <input
                  id="email"
                  type="email"
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                  required
                />
            </div>

            <div className="sm:col-span-3">
              <label className="text-sm font-medium text-gray-900">
                Senha
              </label>
                <input
                  type="password"
                  id="senha"
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                  required
                />
            </div>

            <div className="sm:col-span-3">
              <label className="text-sm font-medium text-gray-900">
                Repetir senha
              </label>
                <input
                  type="password"
                  id="senha"
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                  required
                />
            </div>
            
            <div className="col-span-3">
              <label className="text-sm font-medium text-gray-900">
                Endereço
              </label>
                <input
                  type="text"
                  id="endereco"
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                  required
                />
            </div>

            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-900">
                Num
              </label>
                <input
                  type="text"
                  id="num-endereco"
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-gray-900">
                CEP
              </label>
                <input
                  type="text"
                  id="cep"
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                  required
                />
            </div>

            <div className="sm:col-span-3 sm:col-start-1">
              <label className="text-sm font-medium text-gray-900">
                Cidade
              </label>
                <input
                  type="text"
                  id="cidade"
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                  required
                />
            </div>

            <div className="sm:col-span-3">
              <label className="text-sm font-medium text-gray-900">
                Estado
              </label>
                <input
                  type="text"
                  id="estado"
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                  required
                />
            </div>

        </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
        >
          Salvar
        </button>
      </div>
    </form>

      </div>
    </>
  )
}

export default LoginCriar;