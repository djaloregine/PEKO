const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require("../middleware/multer-config");

const produitsCtrl = require('../controllers/produits');

router.get('/', auth, produitsCtrl.getAllSauce);
router.post('/', auth, multer, produitsCtrl.createSauce);
router.get('/:id', auth, produitsCtrl.getOneSauce);
router.put('/:id', auth, multer, produitsCtrl.modifySauce);
router.delete('/:id', auth, produitsCtrl.deleteSauce);
router.post('/:id/like', auth, produitsCtrl.createLikes);


module.exports = router;