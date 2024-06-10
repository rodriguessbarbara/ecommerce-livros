import { Link } from "react-router-dom";
import Input from "../Input";
import useForm from "../../hooks/useForm";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import Erro from "../Erro";

function LoginForm() {
  const email = useForm("email");
  const senha = useForm();
  const { userLogin, erro } = useContext(AppContext);
  
  async function handleLogin(event) {
    event.preventDefault();

    if (email.validate() && senha.validate()) {
      if (email.value.toLocaleLowerCase() === 'admin@admin.com') {
        userLogin({
          email: email.value,
          senha: senha.value
        }, 'admin');
        } else userLogin({
        email: email.value,
        senha: senha.value
      }, '');
    }
  }
  
  return (
    <>
      <div className="justify-center py-12 mt-20 mx-10">
          <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-700">
            Acesse sua conta!
          </h2>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleLogin}>
            
            <Input label="Email" type="email" name="email" placeholder="exemplo@email.com" {...email} required/>
            
            <Input label="Senha" type="password" name="password" placeholder="*************" {...senha} required/>
            <div className="text-sm">
              {/* <Link to="/login/esqueceuSenha"className="font-semibold text-indigo-600 hover:text-indigo-500">
                Esqueceu a senha?
              </Link> */}
            </div>

            <div>
              <button className="flex w-full justify-center rounded-md bg-indigo-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Entrar
              </button>
            </div>
          </form>

          <p className="mt-2 text-center text-sm text-gray-500">
            ou{' '}
            <Link to="/login/cadastro" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Cadastrar agora.
            </Link>
          </p>

          <Erro erro={erro} />
        </div>
      </div>
    </>
  )
}

export default LoginForm;