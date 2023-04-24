import { Acao, Cotacao } from './models/models.js';
import instance from './src/axios/config.js';

async function fetchAcoes() {
  const response = await instance.get('/api/available');
  const tickersString = response.data.stocks.join(',');
  const quoteResponse = await instance.get(`/api/quote/${tickersString}`);
  const acoesData = quoteResponse.data;
  const acoesArray = [];
  const cotacoesArray = [];

  for (const [key, acaoData] of Object.entries(acoesData)) {
    for (const item of acaoData) {
      if (item.symbol !== null && item.symbol !== undefined) {
        acoesArray.push({
          simbolo: item.symbol,
          nome: item.shortName
        });

        const acao = await Acao.findOne({ where: { simbolo: item.symbol } });
        if (acao) {
          // Ação já existe, então podemos inserir a cotação com o ID da ação
          cotacoesArray.push({
            idacao: acao.idacao,
            cotacao: item.regularMarketPrice,
            valormercado: item.marketCap,
            volumetransacoes: item.regularMarketVolume,
            moeda: 'BRL',
            data: new Date().toISOString().substr(0, 10)
          });
        } else {
          // Ação não existe, então precisamos criá-la antes de inserir a cotação
          const novaAcao = await Acao.create({
            simbolo: item.symbol,
            nome: item.shortName
          });
          cotacoesArray.push({
            idacao: novaAcao.idacao,
            cotacao: item.regularMarketPrice,
            valormercado: item.marketCap,
            volumetransacoes: item.regularMarketVolume,
            moeda: 'BRL',
            data: new Date().toISOString().substr(0, 10)
          });
        }
      }
    }
  }

  await Acao.bulkCreate(acoesArray); // Insere as ações no banco
  await Cotacao.bulkCreate(cotacoesArray); // Insere as cotações no banco
}

async function main() {
  await fetchAcoes(); // Chama a função apenas uma vez
}

main(); // Chama a função principal que executa a operação de banco de dados
