import propTypes from 'prop-types';
import AppContext from "./AppContext";

import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchClients } from '../fetchData';
import { POST_ENTIDADE , GET_USER, GETALL_ENTIDADE, UPDATE_ENTIDADE, DELETE_ENTIDADE, CHECK_USER, GETBYNOME_LIVRO } from '../api'

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
  const [dadosMock, setDadosMock] = useState([]);
  const [pedidos, setPedidos] = useState([]);

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
    return setDadosCliente(response.data || []);
  } catch (error) {
    setErro(error.response.data);
    throw error;
  } finally {
    setLoading(false);
  }
};

//  const atualizarEndereco = async (id, novosDadosEndereco, entidade) => {
//   try {
//     setLoading(true);
//     const response = await UPDATE_ENTIDADE(id, novosDadosEndereco, "endereco");
//     if(response.status === 204) console.log(`${entidade} atualizado com sucesso`)
//   } catch (error) {
//      setErro("Erro ao atualizar dados do endereço:", error);
//      throw error;
//   } finally {
//    setLoading(false);
//  }
// };

   
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

  // const novoLivro = async (novoLivro) => {
  //   try {
  //     setErro(null);
  //     setLoading(true);

  //     const response = await POST_ENTIDADE(novoLivro, "livros");
  //     if (response.status === 201) {
  //       return setBooks(prevBooks => [...prevBooks, response.data]);
  //    }
  //     return;
  //   } catch (error) {
  //     setErro(error.response.data);
  //     throw error; 
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  // const novoPedido = async (novoPedido) => {
  //   try {
  //     setErro(null);
  //     setLoading(true);

  //     const response = await POST_ENTIDADE(novoPedido, "pedidos");
  //     if (response.status === 201) {
  //       return setDadosVendas(prevPedidos => [...prevPedidos, response.data]);
  //    }
  //     return;
  //   } catch (error) {
  //     setErro(error.response.data);
  //     throw error; 
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
    userId,
    dadosMock,
    listarEntidades,
    atualizarDadosMock,
    loading,
    pedidos,
    setPedidos,
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
