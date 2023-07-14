const express = require('express');
const app = express();
const path = require('path');

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


Produto.sync()
  .then(() => {
    console.log('Modelo Produto sincronizado com o banco de dados');
  })
  .catch(error => {
    console.error('Erro ao sincronizar o modelo Produto com o banco de dados:', error);
  });


app.set('views', path.join(__dirname, 'views'));


app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.render('home');
});


app.get('/consulta', (req, res) => {
  res.render('consulta'); 
});


app.get('/produto/inserir', (req, res) => {
  res.render('inserirProduto');
});


app.post('/produto/inserir', (req, res) => {
  const { nome, preco } = req.body; 


  Produto.create({ nome, preco })
    .then(() => {
      res.send("Produto cadastrado com sucesso!")
      console.log("Produto cadastrado com sucesso!");
    })
    .catch(error => {
      console.error('Erro ao adicionar o produto:', error);
      res.status(500).send('Erro ao adicionar o produto'); 
    });
});


app.get('/consulta/resultado', (req, res) => {
  
  const nomeProduto = req.query.nome;

  Produto.findAll({ where: { nome: nomeProduto } })
    .then(results => {
      res.render('resultado', { resultados: results }); 
    })
    .catch(error => {
      console.error('Erro ao consultar o banco de dados:', error);
      res.status(500).send('Erro ao consultar o banco de dados'); 
    });
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
