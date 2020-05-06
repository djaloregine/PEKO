const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/produits')

router.get('/', auth, sauceCtrl.getAllSauce);
router.post('/', auth, sauceCtrl.createSauce);
router.put('/:id', auth, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);


module.exports = router;