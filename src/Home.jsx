import React, { useState, useEffect } from 'react';
import instance from './axios/config';
import DataTable from 'react-data-table-component';

const Home = () => {
  const [tickers, setTickers] = useState([]);
  const [allTickers, setAllTickers] = useState('');

  const getAvailable = async () => {
    try {
      const response = await instance.get('/api/available'); // endpoint
      const tickersString = response.data.stocks.join(',');
      setAllTickers(tickersString);
      getTickers(); 
    } catch (error) {
      console.log(error);
    }
  };

  const getTickers = async () => {
    try {
      const response = await instance.get(`/api/quote/${allTickers}`); // endpoint
      const data = response.data.results;     
      setTickers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAvailable();
  }, []);

  return (
    <div>
      <h1>Ações</h1>
      {/* usar tickers para renderizar tabela, por exemplo */}
      <p>{tickers.map(r=> r.symbol)}</p>
    
    </div>
  );
};

export default Home;
