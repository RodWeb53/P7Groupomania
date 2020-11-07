//import de express
const express = require('express');
//création de l'application app
const app = express();
//Import de body parser
const bodyParser = require('body-parser');
//Import de la config pour la connexion de la bd
const db = require('./config/db');

//Import des routes pour l'authantification
const userRoutes = require('./routes/user');

//Import du path pour pouvoir touver les images de la directory images
const path = require('path');
//import de dotenv pour gérer des variables cachées
require('dotenv').config();
//Import de helmet pour la sécurisation contre les injections
const helmet = require("helmet");

//------------ Connexion a la base de données ---------------------\\
db
 .authenticate()
 .then(() => {
   console.log('La connexion a été établie avec succès.');
 })
 .catch(err => {
   console.error('Impossible de se connecter à la base de données:', err);
 });




//Utilisation de helmet contre les injections de scripts
app.use(helmet());

//Création de header pour autoriser l'acces et enlever les erreurs de CORS (Cross Origin Resource Sharing)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//body parser permet la transformation des corps de la requête en json
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());


//------------Création de middleware ---------------------\\
//Middleware pour gérer les liens vers la directory des images
app.use('/images', express.static(path.join(__dirname, 'images')));
//Middleware pour gérer le lien vers les sauces via le controllers
app.use('/', userRoutes);



//Export de l'application app
module.exports = app;