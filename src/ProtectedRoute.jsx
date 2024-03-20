/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "./context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { login } = useContext(AppContext);

  return login ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;