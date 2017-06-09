const express = require('express');
const router = express.Router();
const gameCtrl = require('../controllers/game/gameCtrl');
const util = require('../helpers/util');
/* GET home page. */
router.use('/',util.authMain); //v
router.post('/',gameCtrl.addUser); //v
router.put('/',gameCtrl.updUserScore);//v

module.exports = router;
