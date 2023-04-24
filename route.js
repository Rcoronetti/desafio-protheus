import express from 'express';
import consultarAcoes from './query.js';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/acoes', async (req, res) => {
  const acoes = await consultarAcoes();
  res.json(acoes);
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
