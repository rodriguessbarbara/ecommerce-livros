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
      max: 10000,
      // ticks: {
      //   stepSize: 5000,
      // }
    }
  },
};

const colors = [
  '#ca002cb2', '#ff6384', '#36a2eb', '#cc65fe', '#ffce56', 
  '#ff9f40', '#4bc0c0', '#9966ff', '#ff6384b2', '#36a2ebb2'
];

const UserData = [
  {    id: 1,    year: 2016,    userGain: 8000,    userLost: 823,  },
  {    id: 2,    year: 2017,    userGain: 4577,    userLost: 345,  },
  {    id: 3,    year: 2018,    userGain: 7888,    userLost: 555,  },
  {    id: 4,    year: 2019,    userGain: 9000,    userLost: 4555,  },
  {    id: 5,    year: 2020,    userGain: 4300,    userLost: 234,  },
  {    id: 6,    year: 2020,    userGain: 7300,    userLost: 531,  },
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

  // console.log(pedidosFiltrados)

  const datasets = books.map((livro, index) => ({
    label: livro.titulo,
    data: UserData[index].userGain, // aqui vai os pedidos retornados pela outra requisicao entre as datas selecionadas
    // fazer um livro.id === pedidosFiltrados[index].LivroPedidos.map((livro) => livro.id)
    backgroundColor: colors[index % colors.length],
    borderColor: colors[index % colors.length],
    borderWidth: 2,
    tension: 0.5,
    pointBorderWidth: 4,
  }));

  const data = {
    labels: UserData.map((data) => data.year),
    type: 'line',
    datasets: datasets
};
  
  //requisição retornar: vendas por livro em cada dia entre as datas selecionadas

  if (loading) return <Loading/>
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