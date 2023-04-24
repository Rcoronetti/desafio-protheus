import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Papa from 'papaparse';



const Home = () => {
  const [acoes, setAcoes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [symbolFilter, setSymbolFilter] = useState('');


  const handleSymbolFilterChange = event => {
    setSymbolFilter(event.target.value);
  };

  const handleSymbolFilter = () => {
    const filteredData = acoes.filter(acoes => acoes.simbolo.toLowerCase().includes(symbolFilter.toLowerCase()));
    setAcoes(filteredData);
  };

  const handleClearFilter = () => {
    setSymbolFilter('');
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/acoes');
        setAcoes(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError('Erro ao carregar dados');
      }
    };
    fetchData();
  };



  const downloadCsv = () => {
    const dataToDownload = acoes.flatMap(({cotacoes, ...rest}) => (
      cotacoes.map(({idcotacao, idacao, valormercado, volumetransacoes, moeda}) => ({        
        valormercado,
        volumetransacoes,
        moeda,
        ...rest,
      }))
    ));
    const csvData = Papa.unparse(dataToDownload);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'acoes.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  

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
      <div>
        <input type="text" value={symbolFilter} onChange={handleSymbolFilterChange} placeholder="Filtrar por símbolo" />
        <button onClick={handleSymbolFilter}>Filtrar</button>
        <button onClick={handleClearFilter}>Limpar Filtro</button>
      </div>
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
      <button onClick={downloadCsv}>Baixar CSV</button>

    </div>
  );
};
export default Home;
