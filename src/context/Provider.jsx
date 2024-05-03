import propTypes from 'prop-types';
import AppContext from "./AppContext";

import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { POST_ENTIDADE , GET_USER, GETALL_ENTIDADE, UPDATE_ENTIDADE, DELETE_ENTIDADE, CHECK_USER, GETBYNOME_LIVRO, CHECK_CUPOM } from '../api'

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
  const [cupomValidado, setCupomValidado] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setPrecoTotal(carrinhoItens.reduce((acc, item) => {
      return (item.precificacao * item.quantidadeCarrinho) + acc;
    }, 0));
  }, [carrinhoItens, setPrecoTotal]);

  const listarCliente = async (userId) => {
    try {
      setErro(null);
      setLoading(true);

      const response = await GET_USER(userId, "clientes");
      setDadosCliente(response.data || []);
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

     const response = await UPDATE_ENTIDADE(id, novosDados, entidade);
     if(response.status === 204) console.log(`${entidade} atualizado com sucesso`)
   } catch (error) {
      setErro(`Erro ao atualizar dados do ${entidade}:`, error);
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
     const response = await DELETE_ENTIDADE(userId, entidade);
     if (response.status === 201) {
       window.alert("Excluido com sucesso!");
       if (entidade === 'clientes') {
        setLogin(null);
        navigate("/");
      }
     }
     return response; 
   } catch (error) {
     console.error("Erro ao deletar a entidade:", error);
     throw error;
   }
 };

  const listarLivrosByNome = async (searchValue) => {
    try {
      setErro(null);
      setLoading(true);

      const response = await GETBYNOME_LIVRO(searchValue);
      return setBooks(response.data || []);
    } catch (error) {
      setErro(error.response.data);
      throw error;

    } finally {
      setLoading(false);
    }
  };

  const verificaCupom = async(cupomData) => {
    try {
      setErro(null);
      setLoading(true);

      const response = await CHECK_CUPOM(cupomData);
      if (response.status === 201) setCupomValidado(response.data);
    } catch(error) {
      setErro(error.response.data);
      setCupomValidado(null)
      throw error; 
    } finally {
      setLoading(false);
    }
  }

  const userLogin = async (usuario, userType) => {
    try {
      setErro(null);
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  const userLogout = () => {
    setLogin(null);
    setCarrinhoItens([]);
    setCupomValidado(null);
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
    criarEntidade,
    atualizarEntidade,
    listarCliente,
    deletarEntidade,
    listarLivrosByNome,
    erro,
    setErro,
    userId,
    listarEntidades,
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
