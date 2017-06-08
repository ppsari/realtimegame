const express = require('express');
const router = express.Router();
const gameCtrl = require('../controllers/gameCtrl');
const util = require('../helpers/util');
/* GET home page. */

// router.use(util.authGame);
// router.use('/:id',util.authGame);

router.get('/',gameCtrl.getAll ); //v
router.get('/:id',gameCtrl.getById ); //v
router.put('/:id',gameCtrl.updateGame ); //v
router.delete('/:id',gameCtrl.deleteGame ); //v
router.post('/',gameCtrl.createGame ); //v

module.exports = router;
