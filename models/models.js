// Definição do modelo Acao
import { DataTypes, Model } from 'sequelize';
import  sequelize  from '../db.js';
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
  modelName: 'acaos',
  freezeTableName: true,
});

// Definição do modelo Cotacao
class Cotacao extends Model {}
Cotacao.init({
  idcotacao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idcotacao'
  },
  idacao: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'idacao'
  },
  cotacao: {
    type: DataTypes.FLOAT,
    allowNull: true,
    field: 'cotacao'
  },
  valormercado: {
    type: DataTypes.FLOAT,
    allowNull: true,
    field: 'valormercado'
  },
  volumetransacoes: {
    type: DataTypes.FLOAT,
    allowNull: true,
    field: 'volumetransacoes'
  },
  moeda : {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'moeda'
  },
  data: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'data'
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
  modelName: 'cotacaos',
  freezeTableName: true,
});


// Definição do relacionamento entre Acao e Cotacao
Acao.hasMany(Cotacao, {
  foreignKey: 'idacao'
});
Cotacao.belongsTo(Acao, {
  foreignKey: 'idacao'
});

export { Acao, Cotacao };










