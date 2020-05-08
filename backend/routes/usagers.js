const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/usagers');

router.post('/signup', userCtrl.signup);
router.post('/loogin', userCtrl.login);

module.exports = router;