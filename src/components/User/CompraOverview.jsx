import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import CarrinhoItem from "../Carrinho/CarrinhoItem";
import Input from "../Input";

function CompraOverview() { 
  const navigate = useNavigate();
  const [isCupom, setIsCupom] = useState(false);
  const [cupomValue, setCupomValue] = useState("");
  const [frete, setFrete] = useState(0);

  const { carrinhoItens, precoTotal } = useContext(AppContext);

  function calculaFrete(precoTotal) {
    let valorFrete = 5.50;
    if (precoTotal > 49 && precoTotal < 100) {
      valorFrete = 2.50;
    } else if (precoTotal > 100) {
      valorFrete = 0;
    }
    setFrete(valorFrete);
  }

  useEffect(() => {
    calculaFrete(precoTotal);
  }, [precoTotal]);

  const handleProxTela = () => {
    navigate("/conta/endereco-compra", {
      state: {
        precoEFrete: (precoTotal + frete),
      }
    });
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto pb-24 text-gray-800 mt-16 px-4 grid grid-cols-3 gap-8">

      <div className="col-span-2">
        <h3 className="text-2xl font-medium text-gray-800 py-4">
            Carrinho de compras
        </h3>

        <div className="mb-6 flex flex-col px-6 py-12 gap-10 bg-gray-100 rounded-md">
          {carrinhoItens.map((item) =>
            <CarrinhoItem key={item.id} data={item} />
          )}
        </div>
      </div>

      <div className="col-span-1">
        <h3 className="text-2xl font-medium text-gray-800 py-4">
            Resumo da compra
        </h3>
      
        <div className="mb-6 flex flex-col px-6 py-12 bg-gray-100 rounded-md">
          <p>
            Produtos: R$ {precoTotal.toFixed(2)}
          </p>
          <p>
            Frete: R${frete.toFixed(2)}
          </p>
          <span className="font-medium text-sm text-red-600">
            {precoTotal < 100 && `adicione mais R$${(100 - precoTotal).toFixed(2)} para ganhar frete gratis`} 
          </span>

          {!isCupom ? (
            <button className="self-start text-blue-800 font-medium" onClick={() => setIsCupom(true)}>
              {cupomValue ? `Cupom aplicado: ${cupomValue}` : 'Inserir cupom'}
            </button>
          ) : (
            <>
            <Input placeholder="Inserir código do cupom" type="text" name="cupom" value={cupomValue} onChange={() => setCupomValue(event.target.value)}/>
            <button className="text-end text-blue-800 font-medium" onClick={() => setIsCupom(false)}>OK</button>
            </>
          )}

          <p className="mt-6 font-medium text-lg text-gray-800 text-end mb-4">
            Preço Total: R$ {(precoTotal + frete).toFixed(2)}
          </p>

          {!carrinhoItens.length ? (
              <p className="text-red-600">Seu carrinho de compras está vazio</p>
            ) : (
          <button onClick={handleProxTela}
            className="rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
            Continuar
          </button>
            )}
        </div>

      </div>
    </div>
  )
}

export default CompraOverview;