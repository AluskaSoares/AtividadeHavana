const { Sequelize, DataTypes } = require('sequelize');


const dbConfig = {
  host: 'localhost',
  user: 'aluno',
  password: 'ifpe2023',
  database: 'mercado'
};


const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql'
});


const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'produtos',
  timestamps: false
});


sequelize.sync()
  .then(() => {
    console.log('Modelo Produto sincronizado com o banco de dados');
  })
  .catch(error => {
    console.error('Erro ao sincronizar o modelo Produto com o banco de dados:', error);
  });

module.exports = Produto;
