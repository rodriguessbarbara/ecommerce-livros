import { Routes, Route } from "react-router-dom";
import SelecionarEnderecoCompra from "./SelecionarEnderecoCompra";
import Conta from "./Conta";
import PagamentoCompra from "./PagamentoCompra";

function Usuario() {
  return (
    <div className="bg-white min-h-screen max-h-full mx-auto px-4 lg:mx-8">
        <Routes>
          <Route path="/" element={<Conta />} />
          <Route path="/endereco-compra" element={<SelecionarEnderecoCompra />} />
          <Route path="/pagamento-compra" element={<PagamentoCompra/>} />
        </Routes>
    </div>
  )
}

export default Usuario