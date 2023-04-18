import React, { useState, useEffect } from 'react';
import instance from './axios/config';
import DataTable  from 'react-data-table-component';

const Home = () => {
    const [tickers, settickers] = useState({});
    const [allTickers, setAllTickers] = useState([]);

const getAvailable = async () => {
    try {
        const response = await instance.get('/api/available'); // endpoint
        const tickersString = response.data.stocks.join(',');
        setAllTickers(tickersString);
       
        
        
      
    }catch(error) {
        console.log(error);
    }
};

    const getTickers = async () => {
        try {
            const response = await instance.get(`/api/quote/${allTickers}`); // endpoint           
            const data = response.data.results;
            
            settickers(data);
        }catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAvailable();
        getTickers();        
    }, []);

                                                                       
console.log(tickers);
    return (
        <div>
            <h1>Ações</h1>       
          
        
        </div>
    )

};

export default Home;