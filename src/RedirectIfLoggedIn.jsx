/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "./context/AppContext";

const RedirectIfLoggedIn = ({children}) => {
  const { login } = useContext(AppContext);

  return login ? <Navigate to="/"/> : children;
};

export default RedirectIfLoggedIn;