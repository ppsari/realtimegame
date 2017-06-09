let User = require('../models/user');

const getAll = (req,res) => {
  User.find()
  .populate('')
  .exec( (err,users) => {
    res.send(err? {err:err.message} : users );
  })
}

const getById = (req,res) => {
  User.findById(req.params.id)
  .populate('gameList.game_id')
  .exec( (err,user) => {
    res.send(err? {err:err.message} : user );
  })
}

const updateUser = (req,res) => {
  User.findById(req.params.id, (err,user) => {
    if (err) res.send({err: 'Invalid ID'});
    else {
      for (let key in req.body) user[key] = req.body[key];
      user.save((err,updtUser) => {
        if (err) {
          let err_msg = '';
          for (let error in err.errors) err_msg += err.errors[error].message+'\n';
          res.send({err:err_msg})
        } else res.send(updtUser );
      });
    }
  })
}

const deleteUser = (req,res) => {
  User.findById(req.params.id, (err,user) => {
    if (err) res.send({err: 'Invalid ID'});
    else
      user.remove((err,updtUser) => {
        res.send(err? {err:err} : updtUser );
      });

  })
}

const createUser = (req,res) => {
  let newUser = new User(req.body);
  newUser.save((err,user) => {
    if (err) {
      let err_msg = '';
      for (let error in err.errors) err_msg += err.errors[error].message+'\n';

        console.log(err_msg);
        res.send({err:err_msg})
    } else res.send(user );
  });
}


module.exports = {
  getAll,
  getById,
  updateUser,
  deleteUser,
  createUser
}