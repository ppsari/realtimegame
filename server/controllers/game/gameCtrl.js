let Game = require('../../models/game');
let User = require('../../models/user');
let util = require('../../helpers/util');
const socket = require('./broadcaster');

const addUser = (req,res) => {
  util.getUserId(req.headers.token, (err,decoded) => {
    console.log('add user ah')
    if (err) res.send({err:'Invalid token'});
    else if ( typeof req.body.game_id === 'undefined') res.send({err:'GameId must be filled'})
    else
      Game.findById(req.body.game_id, (err,game) => {
        if (err) res.send({err:err.message})
        else {
          if (typeof game.userList === 'undefined') game.userList = [];
          let idx = game.userList.findIndex(list => list._user == decoded.id);
          if (idx === -1) {
            User.findById(decoded.id, (err,user)=>{
              if (err) res.send({err:'UserId is not exist'});
              else {
                user.gameList.push(req.body.game_id);
                user.save((err,updUser) => {
                  if (err) res.send({err:'Failed to insert gameList to User'})
                  else {
                    game.userList.push({_user: updUser._id, score: 0});
                    game.save((err,updGame) => {
                      res.send(err? {err:err} : updGame );
                    });
                  }
                })
              }
            })
          } else res.send({err:'User sudah terdaftar'})
        }
      })
  })
}

const updUserScore = (req,res) => {
  if ( typeof req.body.game_id === 'undefined') res.send({err:'GameId must be filled'})
  else if (typeof req.body.score === 'undefined') res.send({err:'Score must be filled'});
  else
    util.getUserId(req.headers.token, (err,decoded) => {
      if (err) res.send({err:'Invalid userId'})
      else
        Game.findById(req.body.game_id, (err,game) => {
          if (err) res.send({err:err.message})
          else if (typeof game.userList === 'undefined') res.send({err:'Invalid userId'});
          else {
            let idx = game.userList.findIndex((list) => list._user == decoded.id);
            if (idx === -1) res.send({err:'Invalid userId'});
            else {
              //update User : totalScore, gameList
              //update Game: userList
              User.findById(decoded.id, (err,user)=>{
                if (err) res.send({err:'UserId is not exist'});
                else {
                  user.totalScore += parseInt(req.body.score);
                  user.save((err,updUser) => {
                    if (err) res.send({err:'Failed to update totalScore to User'})
                    else {
                      game.userList[idx].score = req.body.score;
                      game.save((err,updGame)=> {
                        res.send(err? {err:err} : updGame );
                      })
                    }
                  })
                }
              }) //end updateUser
            }
          }
      })
    });
}


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
      socket.writeUserData(game._id,false);
      res.send(game );
    }
  });
}


module.exports = {
  getAll,
  getById,
  updateGame,
  deleteGame,
  createGame,
  addUser,
  updUserScore
}