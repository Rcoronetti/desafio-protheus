import {Acao, Cotacao} from './models/models.js'

// Cria uma nova instância do modelo Acao com os valores desejados
 Acao.bulkCreate({
  simbolo: 'AAPL',
  nome: 'Apple Inc.'
})
.then(novaAcao => {
  console.log(novaAcao.get())
})
.catch(err => {
  console.log("Erro ao criar a instância: ", err)
})

// Cria uma nova instância do modelo Cotacao com os valores desejados
 Cotacao.bulkCreate({
  idacao: 1,
  cotacao: 123.45,
  valormercado: 123.45,
  volumetransacoes: 123.45,
  moeda: 'BRL',
  data: '2021-01-01'  
})
.then(novaCotacao => {
  console.log(novaCotacao.get())
})
.catch(err => {
  console.log("Erro ao criar a instância: ", err)
})



Cotacao.findOne({where: {idacao: 1}, include: [Acao]})
.then(cotacao => {
 console.log(cotacao)
  console.log(cotacao.acao)
})
.catch(err => {
  console.log("Erro ao buscar a instância: ", err)
})

Acao.findByPk(1, {include: [Cotacao]})
.then(acao => {
  console.log(acao)
    console.log(acao.getCotacao())
  })
