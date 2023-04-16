import Acao from './models/acao.js';


// Cria uma nova instância do modelo Acao com os valores desejados
const novaAcao = await Acao.create({
  simbolo: 'AAPL',
  nome: 'Apple Inc.'
});

// Verifica se a instância foi salva com sucesso no banco de dados
console.log(novaAcao instanceof Acao); // true
