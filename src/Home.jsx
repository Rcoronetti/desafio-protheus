import React, { useState, useEffect } from 'react';
import instance from './axios/config';

const Home = () => {
    const [posts, setPosts] = useState({});

    const getPosts = async () => {
        try {
            const response = await instance.get('/api/quote/PETR4'); // endpoint
            const data = response.data.results[0];
            setPosts(data);
        }catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div>
            <h1>Ações</h1>
            {posts.length ===0 ? <p>Carregando...</p>:
            <div className='post'> 
            <p>Simbolo {posts.symbol}</p>
            <p>Nome {posts.shortName}</p>
            <p>Cotação {posts.regularMarketPrice}</p>
            <p>Valor de Mercado {posts.marketCap}</p>
            <p>Volume de Transações {posts.regularMarketVolume}</p>
            <p>Moeda {posts.currency}</p>
            <p>Data {posts.regularMarketTime}</p>
    
        </div>
        }
        </div>
    )

};

export default Home;