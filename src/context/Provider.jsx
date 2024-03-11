import propTypes from 'prop-types'
import AppContext from "./AppContext"
import { useState } from 'react';

function Provider({ children }) {
  const [books, setBooks] = useState([]);
  const [carrinhoItens, setCarrinhoItens] = useState([]);
  const [isCarrinhoAtivo, setIsCarrinhoAtivo] = useState(false);
  const [isCapaAlternativa, setIsCapaAlternativa] = useState([]);

  const value = {
    books,
    setBooks,
    carrinhoItens,
    setCarrinhoItens,
    isCarrinhoAtivo,
    setIsCarrinhoAtivo,
    isCapaAlternativa,
    setIsCapaAlternativa,
  };

  return (
    <AppContext.Provider value={ value}>
      {children}
    </AppContext.Provider>
  )
}

export default Provider;

Provider.propTypes = {
  children: propTypes.any,
}.isRequired;