import{ Model, DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Sequelize from 'sequelize';


class Acao extends Model {}
Acao.init({
  idacao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idacao'
  },
  simbolo: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'simbolo'
  },
  nome: {
    type: DataTypes.TEXT,
    field: 'nome'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('NOW()'),
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('NOW()'),
    field: 'updated_at'
  },
}, {
  sequelize,
  modelName: 'acao',
  freezeTableName: true // Adiciona esta linha para garantir que o Sequelize use o nome da tabela exato que você especificou em seu modelo
});

export default Acao;