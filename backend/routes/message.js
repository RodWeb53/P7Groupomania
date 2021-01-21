const express = require('express');
const router = express.Router();
const msgCtrl = require('../controllers/message');
const auth = require('../middleware/auth');

//routes pour les messages
router.get('/message', auth, msgCtrl.allMessages);
router.get('/message/:msgId', auth, msgCtrl.viewMessage)
router.get('/message/:userId/messages', auth, msgCtrl.viewMessagesUser);
router.get('/message/:userId/messages/count', auth, msgCtrl.allMessagesUsers);
router.post('/message', auth, msgCtrl.createMessage);
router.put('/message/:msgId', auth, msgCtrl.updateMessage);
router.delete('/message/:msgId', auth, msgCtrl.deleteMessage);


//routes pour les likes messages
router.get('/message/:msgId/like', auth, msgCtrl.allLikes);
router.post('/message/:msgId/like', auth, msgCtrl.postLike);
router.delete('/message/:msgId/like', auth, msgCtrl.deleteLike);

//routes pour les likes user
router.get('/message/:userId/like/count', auth, msgCtrl.allLikesUsers);
module.exports = router;

