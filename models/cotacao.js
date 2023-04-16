// Arquivo models/cotacao.js
import{ Model, DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Sequelize from 'sequelize';

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
    data:{
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
        modelName: 'cotacao',
        freezeTableName: true // Adiciona esta linha para garantir que o Sequelize use o nome da tabela exato que você especificou em seu modelo
      });

export default Cotacao;
