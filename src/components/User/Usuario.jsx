import { Routes, Route } from "react-router-dom";
import FinalizarCompra from "./FinalizarCompra";
import MsgCompraEfetuada from "./MsgCompraEfetuada";
import Conta from "./Conta";

function Usuario() {
  return (
    <div className="bg-white min-h-screen max-h-full mx-auto px-4 lg:mx-8">
        <Routes>
          <Route path="/" element={<Conta />} />
          <Route path="/finalizar-compra" element={<FinalizarCompra />} />
          <Route path="/compra-efetuada" element={<MsgCompraEfetuada />} />
        </Routes>
    </div>
  )
}

export default Usuario