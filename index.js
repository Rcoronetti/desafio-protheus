import { Acao,Cotacao } from './models/models.js';
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
      }   

      if (typeof item.symbol !== 'undefined') {
      const acao = await Acao.findOrCreate({ where: { simbolo: item.symbol } });       

      if (acao) {
        cotacoesArray.push({
          idacao: acao.id,
          cotacao: item.cotacao,
          valormercado: item.valormercado,
          volumetransacoes: item.volumetransacoes,
          moeda : item.moeda,
          data: item.data
        });
      }
     }
   }
 }   
   await Acao.create(acoesArray); // Aguarda o resultado da operação de banco de dados
   await Cotacao.create(cotacoesArray); // Aguarda o resultado da operação de banco de dados
}

async function main() {
   await fetchAcoes(); // Chama a função apenas uma vez
}

main(); // Chama a função principal que executa a operação de banco de dados



