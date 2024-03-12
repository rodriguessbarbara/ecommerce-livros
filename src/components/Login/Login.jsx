import LoginCriar from "./LoginCriar";
import LoginForm from "./LoginForm"
import { Routes, Route } from "react-router-dom";

function Login() {
  return (
    <div className="bg-white min-h-screen">

      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/cadastro" element={<LoginCriar/>} />

      </Routes>
    </div>
  )
}

export default Login