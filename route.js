import express from 'express';
import consultarAcoes from './query.js';
import cors from 'cors';
import cache from 'memory-cache';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

const app = express();
app.use(cors());

app.get('/api/acoes', async (req, res) => {
  const cacheKey = 'acoes';
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log('Retornando dados do cache...');
    return res.json(cachedData);
  }

  const acoes = await consultarAcoes();
  cache.put(cacheKey, acoes, CACHE_DURATION);
  console.log('Dados buscados e armazenados em cache.');
  res.json(acoes);
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
