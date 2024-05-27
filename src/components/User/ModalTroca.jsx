import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { solicitarTrocaBackend, solicitarTrocaItemBackend } from '../../api-status';
import Input from '../Input';
import Erro from "../Erro";

/* eslint-disable react/prop-types */
function AdicionarCartao({ openModalTroca, setOpenModalTroca, pedido, setTipoTroca }) {
  const { setDadosCliente, dadosCliente, setErro, erro, setLoading } = useContext(AppContext);  
  const [isTrocarItem, setIsTrocarItem] = useState(false);
  const [inputValores, setInputValores] = useState([]);
  const [precoValores, setPrecoValores] = useState(0);

  useEffect(() => {
    if (pedido) setInputValores(Array(pedido.LivroPedidos.length).fill(0));
  }, [pedido]);

  async function handleSolicitarTroca(vendaId) {
    const confirmacao = window.confirm("Deseja solicitar a troca do pedido completo?");
    if (confirmacao) {
      try {
        setErro(null);
        setLoading(true);
          
        await solicitarTrocaBackend(vendaId);
        const updatedPedidos = dadosCliente.Pedidos.map(pedido => {
        if (pedido.id === vendaId && pedido.status.toLocaleUpperCase() === 'ENTREGUE') {
          return { ...pedido, status: 'EM TROCA' };
        }
        return pedido;
      });
      setDadosCliente({ ...dadosCliente, Pedidos: updatedPedidos });
      setTipoTroca('completo');

    } catch (error) {
      console.error('Erro ao solicitar troca:', error);
      setErro(error)
    } finally {
      setLoading(false);
      setOpenModalTroca()
    }
    }
  }

  async function handleSolicitarTrocaItem(event, pedido, vendaId) {
    event.preventDefault()
    const quantidades = pedido.quantidade.split(',').map(Number);
    const somaQuantidade = quantidades.reduce((total, quantidade) => total + quantidade, 0);
    const somaInputValores = inputValores.reduce((total, valor) => total + valor, 0);
  
    try {
      setErro(null);
      setLoading(true);

      if (somaInputValores == somaQuantidade) {
        handleSolicitarTroca(vendaId)
      } else if (somaInputValores === 0) {
        setErro('nenhum item selecionado')
      } else {
        await solicitarTrocaItemBackend(vendaId, {
          livrosId: pedido.LivroPedidos.map((item) => item.Livro.id),
          quantidadeTroca: inputValores,
          valorValeTroca: precoValores
        });

        const updatedPedidos = dadosCliente.Pedidos.map(pedido => {
        if (pedido.id === vendaId && pedido.status.toLocaleUpperCase() === 'ENTREGUE') {
          return { ...pedido, status: 'EM TROCA' };
        }
        return pedido;
        });
        setDadosCliente({ ...dadosCliente, Pedidos: updatedPedidos });
        setTipoTroca('parcial');
        setOpenModalTroca()
      }
    } catch (error) {
      console.error('Erro ao solicitar troca do item:', error);
      setErro(error)
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (index, event) => {
    const valor = parseFloat(event.target.value);
    const novosValores = [...inputValores];
    novosValores[index] = valor;
    setInputValores(novosValores);

    const precoTotal = novosValores.reduce((total, quantidade, i) => {
      return total + (quantidade * pedido.LivroPedidos[i].Livro.precificacao);
    }, 0);
    
    setPrecoValores(precoTotal);
  };

  if (openModalTroca) {
    return (
      <div className="text-gray-800 bg-opacity-85 bg-gray-600 fixed inset-0 z-50 flex">
        <div className="max-w-md max-h-full w-full mx-auto my-auto bg-white rounded-lg pt-6">
          <div className="mx-8">
            <div className="flex justify-between text-lg pb-4">
              <h3 className="text-lg font-medium">Solicitar Troca</h3>
              <button className="font-bold border-2 border-green-600 hover:bg-green-10 rounded-lg px-2" onClick={setOpenModalTroca}>
                X
              </button>
            </div>

            <div className="flex gap-2 justify-center mb-4">
              <button className="text-indigo-600 hover:text-white hover:bg-indigo-700 rounded-lg font-medium border border-indigo-400 p-2" onClick={() => {
                setIsTrocarItem(false)
                handleSolicitarTroca(pedido.id)}
              }>
                Trocar Pedido completo
              </button>
              <button className="text-indigo-600 hover:text-white hover:bg-indigo-700 rounded-lg font-medium border border-indigo-400 p-2" onClick={() => setIsTrocarItem(true)}>
                Trocar algum item
              </button>
            </div>

            {isTrocarItem && pedido &&
              <form className="flex flex-col gap-2 mt-4 mb-8" onSubmit={(event) => handleSolicitarTrocaItem(event, pedido, pedido.id)}>
                {pedido.LivroPedidos.map((item, index) => (
                <div key={item.Livro.id}>
                    <Input
                    type="number"
                    min="0"
                    max={Number(pedido.quantidade.split(',')[index])}
                    label={`${item.Livro.titulo} | Quantidade para trocar:`}
                    value={inputValores[index]}
                    onChange={(event) => handleInputChange(index, event)}
                    />
                    <p className="text-sm">Qtd comprada: {pedido.quantidade.split(',')[index]} - R${item.Livro.precificacao} cada</p>
                </div>
                ))} 
                <button className="text-start text-indigo-600 hover:text-indigo-800">Confirmar</button>
                <Erro erro={erro}/>
              </form>
              }
          </div>
      </div>
    </div>  
    )
  }
}

export default AdicionarCartao;
