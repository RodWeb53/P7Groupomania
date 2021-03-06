//import de dotenv pour gérer des variables cachées
require('dotenv').config();

const Sequelize = require('sequelize')
const sequelize = new Sequelize(`${process.env.DB}`, `${process.env.USER}`, `${process.env.PASSWORD}`,{
  host:'localhost',  
  dialect:'mysql'    
});

module.exports = sequelize;