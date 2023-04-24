import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';



const Home = () => {
  const [acoes, setAcoes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {       
        setLoading(true)
      const response = await axios.get('http://localhost:3000/api/acoes');      
      setAcoes(response.data);  
        setLoading(false)   
    } catch (error) {
      console.log(error);
      setError('Erro ao carregar dados');
    }
  };
    fetchData();
  }, []);
 

  const columns = [
    {
      name: 'Simbolo',
      selector: 'simbolo',
      sortable: true,
    },
    {
      name: 'Nome',
      selector: 'nome',
      sortable: true,
    },
    {
      name: 'Data',
      selector: 'cotacoes[0].data',
      sortable: true,
      format: row => moment(row.createdAt).format('DD/MM/YYYY'),
    },
    {
      name: 'Cotação',
      selector: 'cotacoes[0].cotacao',
      sortable: true,
      format: row => row.cotacoes.length> 0 && row.cotacoes[0].cotacao ? row.cotacoes[0].cotacao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }):'',
    },
    {
      name: 'Valor de Mercado',
      selector: 'cotacoes[0].valormercado',
      sortable: true,
      format: row =>row.cotacoes.length >0 && row.cotacoes[0].valormercado ? row.cotacoes[0].valormercado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }):'',
    },
    {
      name: 'Volume de Transações',
      selector: 'cotacoes[0].volumetransacoes',
      sortable: true,
      format: row=> row.cotacoes.length >0 ? row.cotacoes[0].volumetransacoes:null
    },
  ];

  return (
    <div>
      <h1>Ações</h1>
      {loading ? (
        <div className="loading">
        <h5>Carregando dados...</h5>
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <DataTable
          columns={columns}
          data={acoes}
          pagination={true}
          paginationPerPage={10}
          overflowY={true}
        />
      )}
    </div>
  );
};
export default Home;
