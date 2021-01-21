//Import du modèle
const models = require('../models/');
//Import de Jsonwebtoken pour le haschage du token
const jwt = require('jsonwebtoken');
//import de dotenv pour gérer des variables cachées
require('dotenv').config();


//Modification de l'avatar du profil
exports.changeAvatar = (req, res, next) => {
    const userObject = req.file ?
        {
            ...req.body.userId,
            avatar: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } : { ... req.body}
    models.User.update({
        ...userObject, userId:  req.params.userId}, 
        { where: { userId: req.params.userId }}
    )
    .then(() => res.status(200).json({ ...userObject }))
    .catch(error => res.status(400).json({ error }))
}

