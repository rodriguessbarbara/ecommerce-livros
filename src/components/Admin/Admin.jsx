import { Routes, Route } from "react-router-dom";
import Conta from "../User/Conta";

function Admin() {
  return (
    <div className="bg-white min-h-screen max-h-full mx-auto px-4 lg:mx-8">
        <Routes>
          <Route path="/" element={<Conta />} />
        </Routes>
    </div>
  )
}

export default Admin