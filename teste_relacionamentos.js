import {Acao, Cotacao} from './models/models.js'

const novaAcao = await Acao.create({
  simbolo: 'PETR4',
  nome: 'PETROBRAS PN'
});

const novaCotacao = await Cotacao.create({
  cotacao: 28.5,
  valormercado: 20000000000,
  volumetransacoes: 50000000,
  moeda: 'BRL',
  data: new Date(),
  idacao: novaAcao.idacao
});


const acaoSalva = await Acao.findOne({ where: { simbolo: 'PETR4' }});
console.log(acaoSalva.toJSON());

const cotacoes = await novaAcao.getCotacoes();
console.log(cotacoes);








