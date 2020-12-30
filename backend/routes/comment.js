const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

//routes pour les commentaires
router.get('/message/:msgId/comment', commentCtrl.allComments);
router.post('/message/:msgId/comment', commentCtrl.postComment);
router.delete('/message/:msgId/comment/:commentId', auth, commentCtrl.deleteComment);

module.exports = router;