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

// -- Module de chargement de tous les commentaires avec un tri croissant -- \\
exports.allComments = (req, res, next) => {
    models.Comment.findAll({
      attributes: ['comment', 'createdAt', 'msgId', 'userId', 'commentId'],
      where: { msgId: req.params.msgId },
      include: [{
        model: models.User,
        attributes: ['name', 'userId', 'avatar']},
        {model: models.Message,
        attributes: ['msgId', 'content']},
        ],
        order: [['createdAt', 'ASC']]
    })
    .then((comments) => res.status(200).json({comments}))
    .catch(() => res.status(400).json({ error:  'Erreur, impossible de charger les commentaires' }))
  }

// -- Module de chargement du nombre de commentaires par utilisateur -- \\
exports.allCommentsUsers = (req, res, next) => {
  models.Comment.findAndCountAll({
    attributes: ['comment', 'createdAt', 'msgId', 'userId', 'commentId'],
      where: { userId: req.params.userId},
    })
    .then((usersComments) => res.status(200).json({usersComments}))
    .catch(() => res.status(400).json({ error:  'Erreur, impossible de récupérer les messages' }))
}

// -- Module de création d'un commentaire sur un Post -- \\
exports.postComment = (req, res, next) => {
  models.Comment.create({
    include: [{
      model: models.User,
      attributes: ['name', 'userId', 'avatar']
    }],
    comment: req.body.comment,
    userId : getUserId(req),
    msgId : req.params.msgId
  })
  .then((comment) => res.status(201).json({ comment }))
  .catch(() => res.status(400).json({ error:  'Erreur, impossible de publier le commentaire' }))
}

// -- Module de suppression d'un commentaire -- \\
exports.deleteComment = (req, res, next) => {
  models.Comment.findOne({
    where: { commentId: req.params.commentId }
  })
    .then((commentFound) => {
      if (commentFound) {
        models.User.findOne({
          attributes: [ 'isModerateur' ],
          where: { userId: getUserId(req) }
        })
        .then((userIsModerateur) => {
            if ((getUserId(req) == commentFound.userId) || (userIsModerateur.dataValues.isModerateur == true)) {
            models.Comment.destroy({
                where: { commentId: req.params.commentId }
            })
            .then(() => res.status(201).json({ message: 'Commentaire supprimé'}))
            .catch((error) => res.status(404).json({ error })) 
            } else {
                res.status(401).json({ error: "Vous n'avez pas les autorisation pour supprimer le commentaire" })
            }
        })
        .catch(() => res.status(500).json({ error: 'Impossible de lire la base de données !' }))
      } else {
          res.status(404).json({ error: 'Commentaire non trouvé' })
      }
    })
    .catch(() => res.status(500).json({ error: 'Impossible de supprimer le commentaire' }))
}