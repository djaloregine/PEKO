const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require("../middleware/multer-config")

const sauceCtrl = require('../controllers/produits');

router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/', auth, sauceCtrl.getAllSauce);

module.exports = router;