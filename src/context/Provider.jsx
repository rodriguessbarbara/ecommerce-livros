import propTypes from 'prop-types';
import AppContext from "./AppContext";

import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchBooks, fetchClients } from '../fetchData';
import { POST_USER , GET_USER, GET_USERS, UPDATE_USER, DELETE_USER, CHECK_USER } from '../api'

function Provider({ children }) {
  const [books, setBooks] = useState([]);
  const [carrinhoItens, setCarrinhoItens] = useState([]);
  const [isCarrinhoAtivo, setIsCarrinhoAtivo] = useState(false);
  const [isCapaAlternativa, setIsCapaAlternativa] = useState([]);
  const [precoTotal, setPrecoTotal] = useState(0);
  const [dadosCliente, setDadosCliente] = useState([]);
  const [login, setLogin] = useState(null);
  const [erro, setErro] = useState(null);
  const [userId, setUserId] = useState(null);

  const [dadosMock, setDadosMock] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setPrecoTotal(carrinhoItens.reduce((acc, item) => {
      return (item.precificacao * item.quantidadeCarrinho) + acc;
    }, 0));
  }, [carrinhoItens, setPrecoTotal]);

  const listarClientes = async () => {
    try {
      setErro(null);

      const response = await GET_USERS();
      //setDadosCliente(response.data);
      console.log("Clientes listados com sucesso:", response.data);
      return response.data
    } catch (error) {
      setErro(error.response.data);
      throw error;
    }
  };

  const listarCliente = async (userId) => {
    try {
      setErro(null);

      const response = await GET_USER(userId);
      setDadosCliente(response.data[0]);
    } catch (error) {
      setErro(error.response.data);
      throw error;
    }
  };

  const criarUsuario = async (novoUsuario) => {
    try {
      setErro(null);

      const response = await POST_USER(novoUsuario);
      userLogin({email: novoUsuario.email,senha: novoUsuario.senha});
      return response.data;
    } catch (error) {
      setErro(error.response.data);
      throw error; 
    }
  };

 const atualizarDadosCliente = async (userId, novosDadosCliente) => {
   try {
     const response = await UPDATE_USER(userId, novosDadosCliente);
     if(response.status === 204) console.log("cliente atualizado com sucesso")
   } catch (error) {
     console.error("Erro ao atualizar dados do usuário:", error);
   }
 };

   
 useEffect(() => {
  fetchClients().then((response) => {
    setDadosMock(response);
  });
}, []);

const atualizarDadosMock = (novosDadosMock) => {
  setDadosMock((dadosAntigos) => {
    return { ...dadosAntigos, ...novosDadosMock };
  });
};


 const deletarCliente = async (userId) => {
   try {
     const response = await DELETE_USER(userId);
     window.alert("Sua conta foi excluida com sucesso!");

     setLogin(null);
     navigate("/");
     return response; 
   } catch (error) {
     console.error("Erro ao deletar cliente:", error);
     throw error;
   }
 };

  useEffect(() => {
    fetchBooks("tudo").then((response) => {
      setBooks(response);
    });
  }, [setBooks]);

  const userLogin = async (usuario, userType) => {
    try {
      setErro(null);

      const response = await CHECK_USER(usuario);
      setUserId(response.data)
        if (userType === 'admin') {
          setLogin('admin');
          navigate('/admin');
        } else {
          setLogin('user');
          navigate('/conta');
        } 
      return response.data;
    } catch (error) {
      setErro(error.response.data);
      throw error; 
    }
  };

  const userLogout = () => {
    setLogin(null);
    navigate('/login');
  };

  const value = {
    books,
    setBooks,
    carrinhoItens,
    setCarrinhoItens,
    isCarrinhoAtivo,
    setIsCarrinhoAtivo,
    isCapaAlternativa,
    setIsCapaAlternativa,
    precoTotal,
    setPrecoTotal,
    login,
    setLogin,
    userLogin,
    userLogout,
    dadosCliente,
    setDadosCliente,
    atualizarDadosCliente,
    criarUsuario,
    listarClientes,
    listarCliente,
    deletarCliente,
    erro,
    userId,
    dadosMock,
    atualizarDadosMock,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.any.isRequired,
};

export default Provider;
