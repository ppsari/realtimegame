const express = require('express');
const router = express.Router();
const loginCtrl = require('../controllers/loginCtrl');
const util = require('../helpers/util');
/* GET home page. */

router.post('/login',loginCtrl.login); //v
router.post('/register',loginCtrl.register); //v


module.exports = router;
