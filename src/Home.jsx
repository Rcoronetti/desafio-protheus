import React, { useState, useEffect } from 'react';
import instance from './axios/config';
import DataTable from 'react-data-table-component';

const Home = () => {

 

  useEffect(() => {
    getAvailable();
  }, []);

  return (
    <div>
      <h1>Ações</h1>
      {/* usar tickers para renderizar tabela, por exemplo */}     
    
    </div>
  );
};

export default Home;
