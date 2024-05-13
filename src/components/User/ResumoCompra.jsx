/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext';
import Input from '../Input';
import Erro from '../Erro';

function ResumoCompra( { cartaoSelecionado, endSelecionado, setModalOpen, precoFinal, setPrecoFinal, valorInputs, setIdPedido } ) {
  const { carrinhoItens, precoTotal, setCarrinhoItens, criarEntidade, userId, verificaCupom, cupomValidado, erro, atualizarEntidade, setErro } = useContext(AppContext);

  const [isCupom, setIsCupom] = useState(false);
  const [cupomValue, setCupomValue] = useState("");
  const [frete, setFrete] = useState(0);

   const checkCupom = async (event, valorCupom) => {
    event.preventDefault();
    setIsCupom(false)
    await verificaCupom({nome: valorCupom, cliente_id: userId});
  }

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
    if (cupomValidado.length) {
      if (cupomValidado.valor < (precoTotal + frete)) {
        setPrecoFinal((precoTotal + frete) - cupomValidado.valor)
      } else {
        setPrecoFinal(precoTotal + frete)
        setErro("valor do cupom maior do que o valor da compra"); 
      }
    } else {
      setPrecoFinal(precoTotal + frete);
    }
  }, [precoTotal, frete, cupomValidado]);

  const handleConfirm = async (event) => {
    event.preventDefault();
    if (precoFinal > 0 && !cartaoSelecionado.length) {
      return alert("Por favor, selecione ao menos um cartão para continuar."); 
    }
    if (cartaoSelecionado.length > 1 && (valorInputs < precoFinal || valorInputs > precoFinal)) {
      return alert("O valor nos cartões não corresponde com o valor total da compra. Por favor verifique!"); 
    }

    const titulos = carrinhoItens.map((item) => item.id);
    const quantidadeItens = carrinhoItens.map((item) => item.quantidadeCarrinho).join(', ');
    const novoPedido = await criarEntidade({
      tituloLivros: titulos,
      formaPagamento: cartaoSelecionado.length ? "cartao" : 'cupom',
      valor: precoFinal,
      quantidade: quantidadeItens,
      status: "EM PROCESSAMENTO",
      cliente_id: userId,
      cartoes: cartaoSelecionado.length ? cartaoSelecionado.map((c) => c.id) : null,
      cupom_id: cupomValidado ? cupomValidado.id : null,
    }, "pedidos");

    setIdPedido(novoPedido.id)
    carrinhoItens.forEach(async item => {
      await atualizarEntidade(item.id, {quantidade: item.quantidade - item.quantidadeCarrinho}, "livros");
    });

    if (cupomValidado && (cupomValidado.tipo === 'DEVOLUÇÃO' || cupomValidado.tipo === 'TROCA')) await atualizarEntidade(cupomValidado.id, {ativo: false}, "cupom")
    
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
            {cupomValidado && cupomValidado.valor < (precoTotal + frete) ? `Cupom aplicado: ${cupomValidado.nome} ` : 'Inserir cupom ou vale'}
          </button>
          {cupomValidado && cupomValidado.valor < (precoTotal + frete) && (
            <span className="text-gray-800 mb-2 font-bold">
              - R${cupomValidado.valor}
            </span>
          )}
        </>
      ) : (
        <>
        <Input placeholder="Inserir código do cupom" type="text" name="cupom" value={cupomValue} onChange={() => setCupomValue(event.target.value)}/>
        <button className="text-end text-blue-800 font-medium" onClick={(event) => checkCupom(event, cupomValue)}>OK</button>
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

      <Erro erro={erro}/>
  </div>
  )
}

export default ResumoCompra