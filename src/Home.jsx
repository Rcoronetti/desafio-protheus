import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const Home = () => {
  const [acoes, setAcoes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('chegou')
      const response = await axios.get('http://localhost:3000/api/acoes');  
      console.log(response)  
      setAcoes(response.data);
      console.log('passou')
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
    },
    {
      name: 'Cotação',
      selector: 'cotacoes[0].cotacao',
      sortable: true,
    },
    {
      name: 'Valor de Mercado',
      selector: 'cotacoes[0].valormercado',
      sortable: true,
    },
    {
      name: 'Volume de Transações',
      selector: 'cotacoes[0].volumetransacoes',
      sortable: true,
    },
  ];

  return (
    <div>
      <h1>Ações</h1>
      {error ? (
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
