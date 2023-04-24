import { Acao, Cotacao } from './models/models.js';

const consultarAcoes = async () => {
  const acoes = await Acao.findAll({
    include: [{
      model: Cotacao,
      order: [['data', 'DESC']],
      limit: 1,
    }],
  });
  return acoes;
};

export default consultarAcoes;
