import Cotacao from './models/cotacao.js';


// Cria uma nova instância do modelo Acao com os valores desejados
const novaCotacao = await Cotacao.create({
    idacao: 1,
    cotacao: 1.00,
    valormercado: 1.00,
    volumetransacoes: 1.00,
    moeda : 'BRL',
    data: '2021-01-01 00:00:00'
    
});

// Verifica se a instância foi salva com sucesso no banco de dados
console.log(novaCotacao instanceof Cotacao); // true
