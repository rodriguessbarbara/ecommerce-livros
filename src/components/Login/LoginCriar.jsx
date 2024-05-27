import { useContext, useState } from "react";
import useForm from "../../hooks/useForm";
import Input from "../Input";
import AppContext from "../../context/AppContext";
import Erro from "../Erro.jsx";
import Loading from "../Loading.jsx"
//import { cepMask, cpfMask, telefoneMask } from "../../masks";

function LoginCriar() {
  const email = useForm("email");
  const senha = useForm();
  const repetirSenha = useForm();
  const nome = useForm();
  const cpf = useForm();
  const telefone = useForm();
  const [genero, setGenero] = useState("FEMININO");
  const dataNascimento = useForm();
  const lagradouro = useForm();
  const enderecoResidencial = useForm();
  const tipoResidencia = useForm();
  const num = useForm();
  const CEP = useForm();
  const bairro = useForm();
  const cidade = useForm();
  const estado = useForm();
  const pais = useForm();

  const { criarEntidade, erro, setErro, loading } = useContext(AppContext);

  async function handleSubmit(event) {
    event.preventDefault();
    setErro(null);

    if (senha.value === repetirSenha.value) { 
      const novoClienteResponse = await criarEntidade({
        nome: nome.value,
        cpf: cpf.value,
        email: email.value,
        senha: senha.value,
        genero: genero,
        telefone: telefone.value,
        dataNascimento: dataNascimento.value,
        ativo: true,
        role: 'user'
      }, "clientes");
    
      if (novoClienteResponse) handleSubmitEndereco(novoClienteResponse);
    } else setErro("Erro ao criar conta: As senhas não conferem");
  }

  async function handleSubmitEndereco(novoClienteResponse) {    
    const id = novoClienteResponse.id;

    await criarEntidade({
      lagradouro: lagradouro.value,
      enderecoResidencial: enderecoResidencial.value,
      tipoResidencia: tipoResidencia.value,
      num: num.value,
      CEP: CEP.value,
      bairro: bairro.value,
      cidade: cidade.value,
      estado: estado.value,
      pais: pais.value,
      cliente_id: id
    }, "endereco");
  }

  if (loading) return <Loading/>
  return (
    <>
      <div className="justify-center py-6 mt-10 mx-10">
          <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-700">
            Crie sua conta!
          </h2>

      <form className="mt-4 pt-6 sm:mx-auto sm:w-full sm:max-w-4xl border-t-2 border-gray-200" onSubmit={handleSubmit}>
          <h2 className="text-base font-semibold text-gray-900">Dados Pessoais</h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
            <Input label="Nome Completo" type="text" name="nome" span="2" required {...nome}/>
            <Input label="Email" type="email" name="email" span="2" placeholder="exemplo@email.com" required {...email}/>
            <Input label="CPF" type="text" name="cpf" maxLength="14" required {...cpf}/>
            <Input label="Telefone" type="tel" name="telefone" maxLength="15" required {...telefone}/>

            <div>
              <label className="text-sm font-medium text-gray-900">
                  Gênero
                </label>
              <select name="genero" required onChange={(event) => setGenero(event.target.value)} className="w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6">

                <option value="FEMININO" className="text-gray-800">Feminino</option>
                <option value="MASCULINO" className="text-gray-800">Masculino</option>
                <option value="OUTRO" className="text-gray-800">Outro</option>
              </select>
            </div>

            <Input label="Data Nascimento" type="date" name="data-nascimento" required {...dataNascimento}/>
            <Input label="Senha" type="password" name="senha" span="2" minLength="8" required {...senha}/>
            <Input label="Repetir senha" type="password" name="repetir-senha" span="2" minLength="8" required {...repetirSenha}/>

            <Input label="Lagradouro" type="text" name="lagradouro" placeholder="Rua, Av, etc" required {...lagradouro}/>
            <Input label="Endereço Residencial" type="text" name="endereco" span="2" required {...enderecoResidencial}/>
            <Input label="Tipo residência" type="text" name="tipo-residencia" placeholder="Casa, Apt, etc" required {...tipoResidencia}/>              
            <Input label="Num." type="text" name="num-endereco" required {...num}/>              
            <Input label="CEP" type="text" name="cep" maxLength="9" required {...CEP}/>              
            <Input label="Bairro" type="text" name="bairro" required {...bairro}/>              
            <Input label="Cidade" type="text" name="cidade" required {...cidade}/>              
            <Input label="Estado" type="text" name="estado" span="2" required {...estado}/>    
            <Input label="País" type="text" name="pais" span="2" placeholder="Brasil" required {...pais}/>              

          </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            Salvar
          </button>
        </div>

        <Erro erro={erro} />
      </form>

      </div>
    </>
  )
}

export default LoginCriar;