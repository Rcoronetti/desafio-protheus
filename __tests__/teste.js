import { Acao } from "../models/acao.js";
import { Cotacao } from "../models/cotacao.js";

describe('Cotação', () => {
  beforeAll(async () => {
    await Acao.sync();
    await Cotacao.sync();
  });

  afterAll(async () => {
    await Acao.drop();
    await Cotacao.drop();
  });

  it('deve criar uma ação e uma cotação associada', async () => {
    const acao = await Acao.create({ simbolo: 'PETR4', nome: 'Petrobras' });
    const cotacao = await Cotacao.create({
      cotacao: 28.50,
      valormercado: 2000000000,
      volumetransacoes: 1000000,
      moeda: 'BRL',
      data: new Date(),
    });
    await cotacao.setAcao(acao);
    const cotacaoComAcao = await Cotacao.findOne({ where: { idcotacao: cotacao.idcotacao }, include: Acao });
    expect(cotacaoComAcao.Acao.simbolo).toBe('PETR4');
  });
});
