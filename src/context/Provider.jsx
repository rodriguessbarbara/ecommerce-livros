import propTypes from 'prop-types'
import AppContext from "./AppContext"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Provider({ children }) {
  const [books, setBooks] = useState([]);
  const [carrinhoItens, setCarrinhoItens] = useState([]);
  const [isCarrinhoAtivo, setIsCarrinhoAtivo] = useState(false);
  const [isCapaAlternativa, setIsCapaAlternativa] = useState([]);
  const [precoTotal, setPrecoTotal] = useState(0);
  const [isAddBookCard, setIsAddBookCard] = useState(true);
  const [selectedBook, setSelectedBook] = useState([]);
  const [login, setLogin] = useState(null);

  const navigate = useNavigate();

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
    isAddBookCard,
    setIsAddBookCard,
    selectedBook,
    setSelectedBook,
    login,
    setLogin,
    userLogin,
  };

  async function userLogin() {
    setLogin(true);
    navigate('/conta');
  }

  return (
    <AppContext.Provider value={ value }>
      {children}
    </AppContext.Provider>
  )
}

export default Provider;

Provider.propTypes = {
  children: propTypes.any,
}.isRequired;