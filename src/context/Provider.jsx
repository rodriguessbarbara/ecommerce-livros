import propTypes from 'prop-types'
import AppContext from "./AppContext"
import { useState } from 'react';

function Provider({ children }) {
  const [books, setBooks] = useState([]);

  const value = {
    books,
    setBooks
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