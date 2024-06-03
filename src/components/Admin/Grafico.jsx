/* eslint-disable react-hooks/exhaustive-deps */
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend } from 'chart.js/auto';
import { Line } from 'react-chartjs-2'
import Input from '../Input';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';
import { filtrarPedidosDatas } from "../../api";
import Erro from '../Erro';
import Loading from '../Loading';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

const options = {
  plugins: {
      legend: {
          position: 'top',
      },
  },
  scales: {
    x: { 
      grid: {
        display: true
      }
    },
    y: {
      min: 0,
      max: 30,
      ticks: {
        stepSize: 2,
      }
    }
  },
};

const colors = [
  '#ca002cb2', '#ff6384', '#36a2eb', '#cc65fe', '#13a200af', 
  '#ff8000', '#68ffff', '#3f188d', '#64073cb1', '#37ffc6af'
];

function Grafico() {  
  const { books, listarEntidades, erro, setErro, loading, setLoading } = useContext(AppContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pedidosFiltrados, setPedidosFiltrados] = useState(null);
  const today = new Date().toISOString().split('T')[0];
  const minDate = "2020-01-01";

  useEffect(() => {
    const fetchData = async () => {
        await listarEntidades("livros");
      }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      (startDate != null && endDate != null) && await filtrarPedidos(startDate, endDate);
      }
    fetchData();
  }, [setStartDate, setEndDate, startDate, endDate]);

  async function filtrarPedidos(startDate, endDate) {
    try {
      setErro(null);
      setLoading(true);

      const novosDadosPedidos = await filtrarPedidosDatas({startDate, endDate});
      setPedidosFiltrados(novosDadosPedidos)
    } catch (error) {
      console.error('Erro ao encontrar os pedidos a partir das datas fornecidas:', error);
      setErro(error.response.data);
    } finally {
      setLoading(false);
    }
  }

  const gerarDatasLabels = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];
    const mesesSelecionados = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
    // console.log(mesesSelecionados)
    if (mesesSelecionados > 1) {
      while (start <= end) {
        dates.push(new Date(start).toISOString().substring(0, 7));
        start.setMonth(start.getMonth() + 1);
        start.setDate(1);
      }
    } else {
      while (start <= end) {
        dates.push(new Date(start).toISOString().split('T')[0]);
        start.setDate(start.getDate() + 1);
      }
    }
    return dates;
  };
  const datasLabels = startDate && endDate ? gerarDatasLabels(startDate, endDate) : [];
  
  const mapearQuantidades = (pedidos, books, datasLabels) => {
    const quantidadesPorLivro = {};
    books.forEach((livro) => {
      quantidadesPorLivro[livro.id] = Array(datasLabels.length).fill(0);
    });

    pedidos.forEach((pedido) => {
      const quantidades = pedido.quantidade.split(',').map(Number);
      const pedidoDate = new Date(pedido.createdAt);
      const label = (datasLabels[0] && datasLabels[0].length) > 7 ? pedidoDate.toISOString().split('T')[0] : pedidoDate.toISOString().substring(0, 7);
      const dateIndex = datasLabels.indexOf(label);

      pedido.LivroPedidos.forEach((livroPedido, index) => {
        if (quantidadesPorLivro[livroPedido.livro_id] !== undefined && dateIndex !== -1) {
          quantidadesPorLivro[livroPedido.livro_id][dateIndex] += quantidades[index];
        }
      });
    });
    return quantidadesPorLivro;
  };
  const quantidadesPorLivro = pedidosFiltrados != null ? mapearQuantidades(pedidosFiltrados, books, datasLabels) : {};

  const datasets = books.map((livro, index) => ({
    label: livro.titulo,
    data: quantidadesPorLivro[livro.id],
    backgroundColor: colors[index % colors.length],
    borderColor: colors[index % colors.length],
    borderWidth: 2,
    tension: 0.5,
    pointBorderWidth: 4,
  }));

  const data = {
    labels: datasLabels,
    type: 'line',
    datasets: datasets
  };

  if (loading) return <Loading />;
  return (
    <div className="border-b border-gray-200 py-4 text-gray-600 flex flex-col flex-grow">
      <div>
        <h3 className="text-2xl font-medium tracking-tight">Análise de vendas</h3>
        <h4 className="text-lg font-medium mb-8">consulta por datas</h4>
      </div>

      <div className='flex gap-6 justify-around self-center items-center'>
        <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} max={endDate ? endDate : today} min={minDate}/> 
        <span>até</span>
        <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} max={today} min={startDate}/>
      </div>  
      
      <Erro erro={erro}/>

      <div>
        <Line options={options} data={data} />
      </div>
    </div>
  )
}

export default Grafico