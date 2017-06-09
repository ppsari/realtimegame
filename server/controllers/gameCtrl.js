let Game = require('../models/game');
let User = require('../models/user');
const gameNotification = require('./cron/newGame');

const getAll = (req,res) => {
  Game.find()
  .populate('userList._user')
  .exec( (err,games) => {
    res.send(err? {err:err} : games );
  })
}

const getById = (req,res) => {
  Game.findById(req.params.id)
  .populate('userList._user')
  .exec( (err,game) => {
    res.send(err? {err:err} : game );
  })
}

const updateGame = (req,res) => {
  Game.findById(req.params.id, (err,game) => {
    if (err) res.send({err: 'Invalid ID'});
    else {
      for (let key in req.body) game[key] = req.body[key];
      game.save((err,updtGame) => {
        if (err) {
          let err_msg = '';
          for (let error in err.errors) err_msg += err.errors[error].message+'\n';
          res.send({err:err_msg})
        } else res.send(updtGame );
      });
    }
  })
}

const deleteGame = (req,res) => {
  Game.findById(req.params.id, (err,game) => {
    if (err) res.send({err: 'Invalid ID'});
    else
      game.remove((err,updtGame) => {
        res.send(err? {err:err} : updtGame );
      });

  })
}

const createGame = (req,res) => {
  let newGame = new Game(req.body);
  newGame.save((err,game) => {
    if (err) {
      let err_msg = '';
      for (let error in err.errors) err_msg += err.errors[error].message+'\n';
      res.send({err:err_msg})
    } else {
      User.find()
      .populate('userList')
      .exec( (err,users) => {
        if (users) {
          users.forEach(user => {
            gameNotification.newGame(user, game.time);
          })
        }
      })
      res.send(game)
    };
    // res.send(err? {err:err} : game);
  });
}


module.exports = {
  getAll,
  getById,
  updateGame,
  deleteGame,
  createGame
}
