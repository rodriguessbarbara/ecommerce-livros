import propTypes from 'prop-types';
import AppContext from "./AppContext";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchClients } from '../fetchData';

function Provider({ children }) {
  const [books, setBooks] = useState([]);
  const [carrinhoItens, setCarrinhoItens] = useState([]);
  const [isCarrinhoAtivo, setIsCarrinhoAtivo] = useState(false);
  const [isCapaAlternativa, setIsCapaAlternativa] = useState([]);
  const [precoTotal, setPrecoTotal] = useState(0);
  const [selectedBook, setSelectedBook] = useState([]);
  const [dadosCliente, setDadosCliente] = useState([]);
  const [login, setLogin] = useState(null);

  const navigate = useNavigate();
  
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

  const userLogin = () => {
    setLogin(true);
    navigate('/conta');
  };

  const userLogout = () => {
    setLogin(false);
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
    selectedBook,
    setSelectedBook,
    login,
    setLogin,
    userLogin,
    userLogout,
    dadosCliente,
    atualizarDadosCliente,
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
