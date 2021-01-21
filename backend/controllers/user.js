//Import de bcrypt pour le hachage du mot de passe
const bcrypt = require('bcryptjs');
//Import du modèle
const models = require('../models/');
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


const getUserId = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    return userId;
}
  
// -- Module d'enregistrement d'un Utilisateur -- \\
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

    models.User.findOne({
        attributes: ['email'],
        where: { email: req.body.email }
    })
    .then((userFound) => {
        if (!userFound) {
            bcrypt.hash(req.body.password, 10) // 10 passe de salage du password
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
            return res.status(409).json({ error: 'Utilisateur déjà inscrit'})
        }
    })
    .catch(error => res.status(500).json({ error }))      

};

// -- Module de login d'un Utilisateur -- \\
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
                    ismoderateur: user.isModerateur,
                    token: jwt.sign(
                        { userId: user.userId },
                        //la cle token est cachée par dotenv
                        process.env.TOKEN,
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

// -- Module de chargement d'un Utilisateur -- \\
exports.viewProfil = (req, res, next) => {
    models.User.findOne({
        attributes: ['name', 'email', 'bio', 'avatar', 'isModerateur', 'userId'],
        where: { userId: req.params.userId }
    })
    .then((user) => {
        if (user) {
            res.status(201).json(user);
        } else {
            res.status(404).json({ error: "Impossible de trouver l'utilisateur" })
        }
    })
    .catch((error) => {res.status(500).json({ error: "Impossible de trouver le profil" })
    })
};

// -- Module de modification de la Biographie d'un Utilisateur -- \\
exports.updateProfil = (req, res, next) => {
    models.User.findOne({
        where: { userId: req.params.userId }
    })
    .then((userFound) => {
        if (userFound) {
            models.User.findOne({
                attributes: [ 'isModerateur'],
                where: { userId: getUserId(req) }
            })
            .then((userIsModerateur) => {
                if((getUserId(req) == req.params.userId) || (userIsModerateur.dataValues.isModerateur == true)) {
                    models.User.update(req.body, {
                        attributes: [ 'bio'],
                        where: { userId: req.params.userId }
                    })
                    .then(() => res.status(201).json({ message: 'Profil mis à jour'}))
                    .catch((error) => res.status(500).json ({ error }))
                } else {
                    res.status(401).json({ error: "Vous n'avez pas les autorisation pour mettre à jour le profil" })
                }
            })
        } else {
          res.status(404).json({ error: 'Utilisateur non trouvé' })
        }
    })
    .catch((error) => {res.status(500).json({ error: 'Impossible de mettre à jour le profil' })
    })
}

// -- Module de suppression d'un Utilisateur -- \\
exports.deleteProfil = (req, res, next) => {
    models.User.findOne({
        where: { userId: req.params.userId }
    })
    .then((userFound) => {
        if (userFound) {
            models.User.findOne({
                attributes: [ 'isModerateur'],
                where: { userId: getUserId(req) }
            })
            .then((userIsModerateur) => {
                if ((getUserId(req) == userFound.userId) || (userIsModerateur.dataValues.isModerateur == true)) {
                    models.User.destroy({
                        where: { userId: req.params.userId }
                    })
                    .then(() => res.status(201).json({ message: 'Compte supprimé'}))
                    .catch((error) => res.status(404).json({ error })) 
                } else {
                    res.status(401).json({ error: 'Vous n\'êtes pas autorisé à supprimer le compte' })
                }
            })
        } else {
            res.status(404).json({ error: 'Profil non trouvé' })
        }
    })
    .catch((error) => res.status(500).json({ error: 'Impossible de supprimer le compte' }))
}

// -- Module de chargement de tous les Utilisateurs dans un ordre croissant -- \\
exports.getAllProfil = (req, res, next) => {
    models.User.findAll({
        order: [['name', 'ASC']]
    })
        .then((users) => res.status(200).json({ users }))
        .catch((error) => res.status(404).json({ error }))
};
