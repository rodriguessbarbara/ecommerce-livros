/* eslint-disable react-hooks/exhaustive-deps */
import propTypes from 'prop-types';
import AppContext from "./AppContext";

import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { POST_ENTIDADE , GET_ENTIDADE, GETALL_ENTIDADE, UPDATE_ENTIDADE, DELETE_ENTIDADE, LOGIN_USER, GETBYNOME, CHECK_CUPOM, 
  GET_USER, GET_USERBYID, UPDATE_USER, DELETE_USER, UPDATE_SENHA_USER, VALIDATE_TOKEN } from '../api'

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
  const [loading, setLoading] = useState(false)
  const [pedidos, setPedidos] = useState([]);
  const [cupomValidado, setCupomValidado] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setPrecoTotal(carrinhoItens.reduce((acc, item) => {
      return (item.precificacao * item.quantidadeCarrinho) + acc;
    }, 0));
  }, [carrinhoItens, setPrecoTotal]);

  const listarEntidadeById = async (id, entidade) => {
    try {
      setErro(null);
      setLoading(true);

      const response = await GET_ENTIDADE(id, entidade);
      return response.data || [];
    } catch (error) {
      setErro(error.response.data);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const listarUser = async (id) => {
    try {
      setErro(null);
      setLoading(true);

      const response = await GET_USERBYID(id);
      return setDadosCliente(response.data || []);
    } catch (error) {
      setErro(error.response.data);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const criarEntidade = async (novaEntidade, entidade) => {
    try {
      setErro(null);
      setLoading(true);

      const response = await POST_ENTIDADE(novaEntidade, entidade);
      if (response.status === 201) {
        if (entidade === 'clientes') userLogin({email: novaEntidade.email,senha: novaEntidade.senha});
        if (entidade === 'livros') return setBooks(prevBooks => [...prevBooks, response.data]);
        if (entidade === 'endereco') return setDadosCliente({ ...dadosCliente, Enderecos: [...dadosCliente.Enderecos, response.data] });
        if (entidade === 'cartao') return setDadosCliente({ ...dadosCliente, Cartaos: [...dadosCliente.Cartaos, response.data] });
      }
        return response.data;
    } catch (error) {
      setErro(error.response.data);
      throw error; 
    } finally {
      setLoading(false);
    }
  };

 const atualizarEntidade = async (id, novosDados, entidade) => {
   try {
     setLoading(true);
      setErro(null);
      if (entidade === 'clientes') {
        const response = await UPDATE_USER(id, novosDados);
        if(response.status === 204) console.log(`${entidade} atualizado com sucesso`)
      } else {
        const response = await UPDATE_ENTIDADE(id, novosDados, entidade);
        if(response.status === 204) console.log(`${entidade} atualizado com sucesso`)
      }

   } catch (error) {
      setErro(error.response.data);
      throw error;
   } finally {
    setLoading(false);
  }
 };

 const atualizarSenha = async (id, novaSenha) => {
  try {
    setLoading(true);
     setErro(null);
      const response = await UPDATE_SENHA_USER(id, novaSenha);
      if(response.status === 204) console.log("senha atualizado com sucesso")

  } catch (error) {
     setErro(error.response.data);
     throw error;
  } finally {
   setLoading(false);
 }
};

 const listarEntidades = async (entidade) => {
  try {
    setErro(null);
    setLoading(true);

    const response = await GETALL_ENTIDADE(entidade);
    if (entidade === 'livros') return setBooks(response.data || []);
    if (entidade === 'pedidos') return setPedidos(response.data || []);
    if (entidade === 'clientes') return setDadosCliente(response.data || []);

    return response.data;
  } catch (error) {
    setErro(error.response.data);
    throw error;
  } finally {
    setLoading(false);
  }
};

 const deletarEntidade = async (userId, entidade) => {
   try {

    if (entidade === 'clientes') {
      const response = await DELETE_USER(userId);
      if (response.status === 201) {
        window.alert("Excluido com sucesso!");
         setLogin(null);
         navigate("/");
      }

      return response; 
    } else {
      const response = await DELETE_ENTIDADE(userId, entidade);
      if (response.status === 201) {
        window.alert("Excluido com sucesso!");
      }

      return response; 
    }
   } catch (error) {
     console.error("Erro ao deletar a entidade:", error);
     throw error;
   }
 };

  const listarByNome = async (searchValue, entidade) => {
    try {
      setErro(null);
      setLoading(true);

      const response = await GETBYNOME(searchValue, entidade);
      if (entidade === 'livros') return setBooks(response.data || []);
      if (entidade === 'clientes') return setDadosCliente(response.data || []);
    } catch (error) {
      setErro(error.response.data);
      throw error;

    } finally {
      setLoading(false);
    }
  };

  const verificaCupom = async(cupomData, tipoCupom) => {
    try {
      setErro(null);
      setLoading(true);

      const response = await CHECK_CUPOM(cupomData);
      if (response.status === 201) {
        if (cupomValidado.some(cupom => cupom.tipo === tipoCupom)) {
          setErro("Você já aplicou um cupom desse tipo.");
        } else if (response.data.tipo === tipoCupom) {
            setCupomValidado([...cupomValidado, response.data]);
          } else {
            setErro("O cupom inserido não é do tipo adequado.");
          }
      }
    } catch(error) {
      setErro(error.response.data);
      setCupomValidado([])
      throw error; 
    } finally {
      setLoading(false);
    }
  }

  const userLogin = async (usuario, userType) => {
    try {
      setErro(null);
      setLoading(true);

      const tokenResponse = await LOGIN_USER(usuario);
      window.localStorage.setItem("token", tokenResponse.data);
      const userResponse = await GET_USER(tokenResponse.data);

      setUserId(userResponse.data.id)
        if (userType === 'admin') {
          setLogin('admin');
          navigate('/admin');
        } else {
          setLogin('user');
          navigate('/conta');
        } 
    } catch (error) {
      setErro(error.response.data);
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  const userLogout = useCallback(async () => {
    setLogin(null);
    setCarrinhoItens([]);
    setCupomValidado([]);

    window.localStorage.removeItem("token");
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const autoLogin = async () => {
      const token = window.localStorage.getItem("token");

      if (token) {
        try {
          setErro(null);
          setLoading(true);

          const tokenValidado = VALIDATE_TOKEN(token);
          if (tokenValidado) {
            const userResponse = await GET_USER(token);
            setUserId(userResponse.data.id)

            if (userResponse.data.email === 'admin@admin.com') {
              setLogin('admin');
            } else {
              setLogin('user');
            } 
          }
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      }
    }
    autoLogin();
  }, []);

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
    criarEntidade,
    atualizarEntidade,
    atualizarSenha,
    listarEntidadeById,
    deletarEntidade,
    listarByNome,
    erro,
    setErro,
    userId,
    listarEntidades,
    listarUser,
    loading,
    setLoading,
    pedidos,
    setPedidos,
    verificaCupom,
    cupomValidado,
    setCupomValidado,
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
