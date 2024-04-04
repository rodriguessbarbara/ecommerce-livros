import propTypes from 'prop-types';
import AppContext from "./AppContext";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchBooks, fetchClients } from '../fetchData';
//import { POST_USER , GET_USERS, GET_USER, UPDATE_USER, DELETE_USER } from '../api'

function Provider({ children }) {
  const [books, setBooks] = useState([]);
  const [carrinhoItens, setCarrinhoItens] = useState([]);
  const [isCarrinhoAtivo, setIsCarrinhoAtivo] = useState(false);
  const [isCapaAlternativa, setIsCapaAlternativa] = useState([]);
  const [precoTotal, setPrecoTotal] = useState(0);
  const [dadosCliente, setDadosCliente] = useState([]);
  const [login, setLogin] = useState(null);
//  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setPrecoTotal(carrinhoItens.reduce((acc, item) => {
      return item.precificacao + acc;
    }, 0));
  }, [carrinhoItens, setPrecoTotal]);
  
//  useEffect(() => {
//    listarClientes();
//  }, []);

//  const listarClientes = async () => {
//    try {
//      const response = await GET_USERS();
//      setDadosCliente(response.data);
//      console.log("Clientes listados com sucesso:", response.data);
//    } catch (error) {
//      console.error("Erro ao listar clientes:", error);
//      throw error;
//    }
//  };

  const criarUsuario = async (novoUsuario) => {
    try {
      //const response = await POST_USER(novoUsuario);
      //console.log("Usuário criado com sucesso:", response.data);
      //return response.data;
      console.log("Usuário criado com sucesso:");

    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error; 
    }
  };

//  const atualizarDadosCliente = async (userId, novosDadosCliente) => {
//    try {
//      const response = await UPDATE_USER(userId, novosDadosCliente);
//      setDadosCliente(response.data);
//      console.log("Dados do usuário atualizados com sucesso:", response);
//    } catch (error) {
//      console.error("Erro ao atualizar dados do usuário:", error);
//    }
//  };

//  const deletarCliente = async (userId) => {
//    try {
//      const response = await DELETE_USER(userId);
//      console.log("Cliente deletado com sucesso:", userId);
//      return response; 
//    } catch (error) {
//      console.error("Erro ao deletar cliente:", error);
//      throw error;
//    }
//  };
 
  
  useEffect(() => {
    fetchClients().then((response) => {
      setDadosCliente(response);
    });
  }, []);

  const atualizarDadosCliente = (novosDadosCliente) => {
    setDadosCliente((dadosAntigos) => {
      return { ...dadosAntigos, ...novosDadosCliente };
    });
  };

  useEffect(() => {
    fetchBooks("tudo").then((response) => {
      setBooks(response);
    });
  }, [setBooks]);

  const userLogin = (userType) => {
    if (userType === 'admin') {
      setLogin('admin');
      navigate('/admin');
    } else {
      setLogin('user');
      navigate('/conta');
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
    atualizarDadosCliente,
    criarUsuario,
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
