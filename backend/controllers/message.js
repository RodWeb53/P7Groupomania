//Import du modèle
const models = require('../models/');
//Import de Jsonwebtoken pour le haschage du token
const jwt = require('jsonwebtoken');
//import de dotenv pour gérer des variables cachées
require('dotenv').config();


const getUserId = (req) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN);
  const userId = decodedToken.userId;
  return userId;
}


//chargement de tous les messages
exports.allMessages = (req, res, next) => {
  models.Message.findAll({
      attributes: ['content', 'createdAt', 'msgId', 'userId'],
      include: [{
          model: models.User,
          attributes: ['name', 'userId', 'avatar']
          }
      ],
      order: [['createdAt', 'DESC']]
  })
  .then((messages) => res.status(200).json({ messages }))   
  .catch(() => res.status(400).json({ error:  'Erreur, impossible de charger les messages' }))  
}


//création d'un message
exports.createMessage = (req, res, next) => {
  models.Message.create({
      include: [{
          model: models.User,
          attributes: ['name', 'userId', 'avatar']
          }
      ],
      content: req.body.content,
      userId : getUserId(req)
  })
  .then((message) => res.status(201).json({ message }))
  .catch(() => res.status(400).json({ error:  'Erreur, impossible de publier le message' }))
}

//recupération d'un seul message par l'ID
exports.viewMessage = (req, res, next) => {
  models.Message.findOne({
      attributes: ['content', 'createdAt', 'userId'],
      where: { msgId: req.params.msgId },
      include: [{
          model: models.User,
          attributes: ['name', 'userId', 'avatar']
          }
      ],
  })
  .then((message) => {
      if (message) {
       res.status(200).json({message})
      } else {
        res.status(404).json({ error: "Le message recherché n'existe pas !" })
      }
  })
  .catch(() => res.status(500).json({ error: 'Impossible de lire le message demandé !' }))
}

// Modification d'un message
exports.updateMessage = (req, res, next) => {

  models.Message.findOne({
      where: { msgId: req.params.msgId },
      include: [{
          model: models.User,
          attributes: ['userId']
      }]
  })
  .then((msgFound) => {
      if (msgFound) {
          models.User.findOne({
              attributes: [ 'isModerateur' ],
              where: { userId: getUserId(req) }
          })
          .then((userIsModerateur) => {
              if ((getUserId(req) == msgFound.userId) || (userIsModerateur.dataValues.isModerateur == true)) {
                  models.Message.update(req.body, {
                      attributes: [ 'content' ],
                      where: { msgId: req.params.msgId }
                  })
                  .then(() => res.status(201).json({ message: 'Message modifié'}))
                  .catch((error) => res.status(500).json ({ error }))
              } else {
                  res.status(401).json({ error: "Vous n'êtes pas autorisé à modifier le message" })
              }
          })
          .catch(() => res.status(500).json({ error: 'Impossible de communiquer avec la base de données' }))
      } else {
      res.status(404).json({ error: 'Message non trouvé' })
      }
  })
  .catch(() => res.status(500).json({ error: 'Impossible de modifier le message' }))
}

// Suppression d'un message
exports.deleteMessage = (req, res, next) => {
  models.Message.findOne({
      where: { msgId: req.params.msgId }
  })
  .then((msgFound) => {
      if (msgFound) {
          models.User.findOne({
              attributes: [ 'isModerateur' ],
              where: { userId: getUserId(req) }
          })
          .then((userIsModerateur) => {
              if ((getUserId(req) == msgFound.userId) || (userIsModerateur.dataValues.isModerateur == true)) {
                  models.Message.destroy({
                      where: { msgId: req.params.msgId }
                  })
                  .then(() => res.status(201).json({ message: 'Message supprimé'}))
                  .catch((error) => res.status(404).json({ error })) 
              } else {
                  res.status(401).json({ error: "Vous n'avez pas les autorisation pour supprimer le message" })
              }
          })
          .catch(() => res.status(500).json({ error: 'Impossible de communiquer avec la base de données' })) 
      } else {
          res.status(404).json({ error: 'Message non trouvé' })
      }
  })
  .catch(() => res.status(500).json({ error: 'Impossible de supprimer le message' }))
}

//chargement de tous les Likes
exports.allLikes = (req, res, next) => {

  models.Like.findAndCountAll({
      attributes: ['likeId', 'userId', 'msgId'],
      where: { 'msgId': req.params.msgId},
      
  })
  .then((likes) => res.status(200).json({likes}))
  .catch(() => res.status(400).json({ error:  'Erreur, impossible de récupérer les Likes' }))
}

// Création d'un like
exports.postLike = (req, res, next) => {
  models.Message.findOne({
    attributes: ['msgId'],
    where: { msgId: req.params.msgId },
  })
  .then((msgFound) => {
    if (msgFound) {
      models.Like.findOne({
        attributes: ['userId', 'msgId'],
        where: { userId: getUserId(req),
          msgId: req.params.msgId }
      })
        .then((likeFound) => {
          if (!likeFound) {
            models.Like.create({
              include: [{
                model: models.User,
                attributes: ['userId']},
                {model: models.Message,
                attributes: ['msgId']}
              ],
              userId : getUserId(req),
              msgId : req.params.msgId
              })
                .then(() => {res.status(201).json({ message: "Like posté" })})
                .catch(() => res.status(400).json({ error:  'Erreur, impossible de poster le like' }))
              } else {
                res.status(400).json({ error: 'Vous avez déjà liké' })
              }
          })
          .catch(() => res.status(500).json({ error: 'Impossible de liké le message' }))
      } else {
        res.status(400).json({ error: "Ce message n'existe pas" })
      }
  })
  .catch(() => res.status(500).json({ error: 'Impossible de lire le message' }))
      
}

//suppression d'un like
exports.deleteLike = (req, res, next) => {
  models.Message.findOne({
      attributes: ['msgId'],
      where: { msgId: req.params.msgId },
  })
  .then((msgFound) => {
      if (msgFound) {
          models.Like.findOne({
              attributes: ['userId', 'msgId'],
              where: { userId: getUserId(req),
                      msgId: req.params.msgId }
          })
          .then((likeFound) => {
              if (likeFound) {
                  models.Like.destroy({
                      where: { msgId: req.params.msgId,
                              userId: getUserId(req) },
                  })
                  .then((message) => res.status(201).json({ message: "Like supprimé" }))
                  .catch((error) => res.status(400).json({ error:  'Erreur de la base de données, impossible de supprimer le like' }))
              } else {
                res.status(404).json({ error: 'Vous ne pouvez pas supprimer un like qui n\'existe pas' })
              }
          })
          .catch((error) => {
              res.status(500).json({ error: 'Impossible de supprimer le like' })
          })
      } else {
        res.status(404).json({ error: 'Ce message n\'existe pas' })
      }
  })
  .catch((error) => {
      res.status(500).json({ error: 'Impossible de voir le message' })
  })
      
}
