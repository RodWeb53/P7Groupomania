const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const passModif = require('../controllers/passModify');
const avatar = require('../controllers/changeAvatar');
const multer = require("../middleware/multer-config")
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profil/:userId', auth, userCtrl.viewProfil);
router.get('/profil', auth, userCtrl.getAllProfil);
router.put('/profil/:userId', auth, userCtrl.updateProfil);
router.put('/profil/:userId/changeAvatar', multer, avatar.changeAvatar);
router.put('/profil/:userId/passModify', passModif.updatePass);

router.delete('/profil/:userId', auth, userCtrl.deleteProfil);

module.exports = router;