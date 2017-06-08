const express = require('express');
const router = express.Router();
const gameCtrl = require('../controllers/gameCtrl');
const util = require('../helpers/util');
/* GET home page. */
router.use('/main',util.authMain); //v
router.use('/',util.authGame); //v
router.use('/:id',util.authGame); //v

router.post('/main',gameCtrl.addUser); //v
router.put('/main',gameCtrl.updUserScore); //v
router.get('/',gameCtrl.getAll ); //v
router.get('/:id',gameCtrl.getById ); //v
router.put('/:id',gameCtrl.updateGame ); //v
router.delete('/:id',gameCtrl.deleteGame ); //v
router.post('/',gameCtrl.createGame ); //v


module.exports = router;
