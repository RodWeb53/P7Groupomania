//Import de bcrypt pour le hachage du mot de passe
const bcrypt = require('bcryptjs');
//Import du modèle
const models = require('../models/');
//const User = require('../models/user');
//Import de Jsonwebtoken pour le haschage du token
const jwt = require('jsonwebtoken');
//import de dotenv pour gérer des variables cachées
require('dotenv').config();

//mail-validator permet de vérifier que l'utilisateur utilise une adresse email valide en utilisant une REGEX contenu dans le plugin
const mailValidator = require('email-validator');
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


exports.signup = (req, res, next) => {
    
    //Vérification si l'adresse mail est valide avec Mail-Validator
    if (!mailValidator.validate(req.body.email)){ 
        res.status(401).json({ message: "Veuillez saisir une adresse email valide !" })
    }
    //Vérifiaction que le Pseudo contient entre 3 et 25 caractères 
    if (req.body.name.length >= 26 || req.body.name.length <= 2){
        res.status(402).json({ message: "Veuillez saisir un pseudo entre 3 et 25 caractères !" }) 
    }
    //Verification que le Mdp correspond au schéma de password-validator 
    if(!schema.validate(req.body.password)) {
        res.status(403).json({ message: "Veuillez saisir un mot de passe fort, entre 8 et 60 caractères avec au moins un caractère majuscule et un minuscule et 1 chiffre."})
    }
    
    console.log(req.body)

    models.User.findOne({
        attributes: ['email'],
        where: { email: req.body.email }
    })
    .then((userFound) => {
        if (!userFound) {
            bcrypt.hash(req.body.password, 10) // 10 salage du password
            .then(hash => {
                const newUser = models.User.create ({
                    email: req.body.email,
                    password: hash,
                    name: req.body.name,
                    bio: 'Veuillez compléter votre Bio...',
                    ismoderateur: 0,
                    avatar: "http://localhost:3000/images/avatar-default.png"
                })
                .then((newUser) => res.status(201).json({ message: "Utilisateur créé avec l'id " + newUser.userId }))
                .catch(error => res.status(400).json({ error }));     
            })    
        } else {
            return res.status(409).json({ error: 'L \'utilisateur déjà inscrit'})
        }
    })
    .catch(error => res.status(500).json({ error }))      

};

// version projet 6 avec modif sql
exports.login = (req, res, next) => {
    models.User.findOne({ 
        attributes: ['email', 'userId', 'password', 'isModerateur'],
        where: { email: req.body.email }
    })
      .then(user => {
        if (user){
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) return res.status(401).json({ error: 'Mot de passe incorrect !' });
                res.status(200).json({
                    userId: user.userId,
                    ismoderateur: user.ismoderateur,
                    token: jwt.sign(
                        { userId: user.userId },
                        //la cle token est cachée par dotenv
                        `${process.env.DB_USER}`,
                        { expiresIn: '24h' }
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }))
                
            } else {
                return res.status(401).json({ error: 'Utilisateur non trouvé !'})
            }
      })
      .catch(error => res.status(500).json({ error }));
  };
