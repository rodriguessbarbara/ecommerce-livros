/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext';
import Input from '../Input';

const cupons = 
  {
    nome: 'LIVRO5',
    valor: 5,
  }

function ResumoCompra( { cartaoSelecionado, endSelecionado, setModalOpen, precoFinal, setPrecoFinal, valorInputs } ) {
  const { carrinhoItens, precoTotal, setCarrinhoItens, dadosMock, atualizarDadosMock } = useContext(AppContext);

  const [isCupom, setIsCupom] = useState(false);
  const [cupomValue, setCupomValue] = useState("");
  const [frete, setFrete] = useState(0);

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

  useEffect(() => {
    cupons.nome === cupomValue ? setPrecoFinal((precoTotal + frete) - cupons.valor) : setPrecoFinal(precoTotal + frete)
  }, [precoTotal, frete, cupomValue]);

  const handleConfirm = (event) => {
    event.preventDefault();
    if (!cartaoSelecionado.length) {
      return alert("Por favor, selecione ao menos um cartão para continuar."); 
    }

    if (valorInputs < precoFinal || valorInputs > precoFinal) {
      return alert("O valor nos cartões não corresponde com o valor total da compra. Por favor verifique!"); 
    }

    const dataCompra = new Date().toLocaleDateString("pt-BR");
    const novoPedido = {
      id: 3,
      livro: carrinhoItens.map((item) => (item.titulo)),
      formaPagamento: "cartao",
      numeroCartao: cartaoSelecionado.map((c) => (c.numeroCartao)),
      bandeira: cartaoSelecionado.map((c) => (c.bandeira)),
      valor: precoFinal.toFixed(2),
      quantidade: carrinhoItens.reduce((total, item) => total + item.quantidadeCarrinho, 0),
      dataCompra: dataCompra,
      status: "em processamento"
    };

    atualizarDadosMock({ pedidos: [...dadosMock.pedidos, novoPedido] });
    setCarrinhoItens([]);
    setModalOpen(true);
  };

  return (
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
        <>
          <button className="self-start text-blue-800 font-medium" onClick={() => setIsCupom(true)}>
            {cupomValue ? `Cupom aplicado: ${cupomValue} ` : 'Inserir cupom ou vale'}
          </button>
          {cupons.nome === cupomValue && (
            <span className="text-gray-800 mb-2 font-bold">
              - R$ {cupons.valor}.00
            </span>
          )}
        </>
      ) : (
        <>
        <Input placeholder="Inserir código do cupom" type="text" name="cupom" value={cupomValue} onChange={() => setCupomValue(event.target.value)}/>
        <button className="text-end text-blue-800 font-medium" onClick={() => setIsCupom(false)}>OK</button>
        </>
      )}

      <p className="mt-4 text-gray-800 text-end font-bold text-lg">
        Preço Total: R$ {precoFinal.toFixed(2)}
      </p>

      <span className='text-sm text-gray-500 text-end mb-4'>Envio para {endSelecionado.lagradouro} {endSelecionado.enderecoResidencial}, {endSelecionado.num}</span>
          
      <button onClick={handleConfirm}
        className="rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
        Confirmar Compra
      </button>
    </div>

  </div>
  )
}

export default ResumoCompra