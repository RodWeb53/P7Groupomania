//Import de bcrypt pour le hachage du mot de passe
const bcrypt = require('bcryptjs');
//Import du modèle
const models = require('../models/');
//Import de Jsonwebtoken pour le haschage du token
const jwt = require('jsonwebtoken');
//import de dotenv pour gérer des variables cachées
require('dotenv').config();

//password-validator permet de définir un schéma pour la compléxité du mot de passe
const passwordValidator = require('password-validator'); 

const schema = new passwordValidator();

schema
.is().min(8)                    // Longueur Minimum 8 caractères
.is().max(60)                   // Longueur Maximum 60 caractères
.has().uppercase(1)             // 1 lettre majuscule minimum
.has().lowercase(1)             // 1 lettre minuscule minimum
.has().digits(1)                // 1 chiffre minimum
.has().not().spaces()           // Ne doit pas avoir d'espace, pas pris en compte


exports.updatePass = (req, res) => {
  //Verification que le Mdp correspond au schéma de password-validator 
  if(!schema.validate(req.body.password)) {
    res.status(403).json({ message: "Veuillez saisir un mot de passe fort, entre 8 et 60 caractères avec au moins un caractère majuscule et un minuscule et 1 chiffre."})
  }
  var password = req.body.changePassword

  models.User.findOne({
      attributes: ['email', 'userId', 'password', 'isModerateur'],
      where: { userId: req.body.userId }
  })
  .then((userFound) => {
      if (userFound) {
          userFound.update({
              password: (password ? bcrypt.hashSync(req.body.changePassword, (bcrypt.genSaltSync(10))) : userFound.password),
          })
          .then((userFound) => {
              return res.status(201).json(userFound)
          })
          .catch((error) => res.status(500).json ({ error }))
      } else {
          res.status(401).json({ error: "Vous n'avez pas les autorisation pour mettre à jour le mot de passe" })
      }
  })
  .catch((error) => {
    res.status(500).json({ error: 'Impossible de mettre à jour le mot de passe' })
  })
}

