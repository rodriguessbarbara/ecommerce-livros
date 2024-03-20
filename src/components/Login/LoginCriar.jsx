import Input from "../Input";

function LoginCriar() {

  return (
    <>
      <div className="justify-center py-6 mt-10 mx-10">
          <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-700">
            Crie sua conta!
          </h2>

      <form className="mt-4 pt-6 sm:mx-auto sm:w-full sm:max-w-4xl border-t-2 border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Dados Pessoais</h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
            <Input label="Nome Completo" type="text" name="nome" span="2" required/>
            <Input label="Email" type="email" name="email" span="2" placeholder="exemplo@email.com" required/>
            <Input label="CPF" type="text" name="cpf" required/>
            <Input label="Telefone" type="tel" name="telefone" required/>

            <div>
              <label className="text-sm font-medium text-gray-900">
                  Gênero
                </label>
              <select name="genero" required className="w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6">

                <option value="feminino" className="text-gray-800" defaultValue={true}>Feminino</option>
                <option value="masculino" className="text-gray-800">Masculino</option>
                <option value="outro" className="text-gray-800">Outro</option>
              </select>
            </div>

            <Input label="Data Nascimento" type="date" name="data-nascimento" required/>
            <Input label="Senha" type="password" name="senha" span="2" required/>
            <Input label="Repetir senha" type="password" name="repetir-senha" span="2" required/>

            <Input label="Lagradouro" type="text" name="lagradouro" placeholder="Rua, Av, etc" required/>
            <Input label="Endereço Residencial" type="text" name="endereco" span="2" required/>
            <Input label="Tipo residência" type="text" name="tipo-residencia" placeholder="Casa, Apt, etc" required/>              
            <Input label="Num." type="text" name="num-endereco" required/>              
            <Input label="CEP" type="text" name="cep" required/>              
            <Input label="Bairro" type="text" name="bairro" required/>              
            <Input label="Cidade" type="text" name="cidade" required/>              
            <Input label="Estado" type="text" name="estado" span="2" required/>    
            <Input label="País" type="text" name="pais" span="2" placeholder="Brasil" required/>              

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