const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');
const util = require('../helpers/util');
/* GET home page. */

router.use('/',util.authUser);
router.use('/:id',util.authUser);

router.get('/',userCtrl.getAll ); //v
router.get('/:id',userCtrl.getById ); //v
router.put('/:id',userCtrl.updateUser ); //v
router.delete('/:id',userCtrl.deleteUser ); //v
router.post('/',userCtrl.createUser ); //v

module.exports = router;
