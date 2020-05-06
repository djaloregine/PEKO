const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/produits')

router.get('/', sauceCtrl.getAllSauce);
router.post('/', sauceCtrl.createSauce);
router.put('/:id', sauceCtrl.modifySauce);
router.delete('/:id', sauceCtrl.deleteSauce);
router.get('/:id', sauceCtrl.getOneSauce);




module.exports = router;