import { Routes, Route } from "react-router-dom";
//import CompraOverview from "./CompraOverview";
import FinalizarCompra from "./FinalizarCompra";
import MsgCompraEfetuada from "./MsgCompraEfetuada";
import Conta from "./Conta";

function Usuario() {
  return (
    <div>

        aaaaaaaaaaaa
        <Routes>
          <Route path="/" element={<Conta />} />
          <Route path="/finalizar-compra" element={<FinalizarCompra />} />
          <Route path="/compra-efetuada" element={<MsgCompraEfetuada />} />
        </Routes>
    </div>
  )
}

export default Usuario