const express = require('express');
const router = express.Router();

const usagersCtrl = require('../controllers/usagers');

router.post('/signup', usagersCtrl.signup);
router.post('/login', usagersCtrl.login);

module.exports = router;