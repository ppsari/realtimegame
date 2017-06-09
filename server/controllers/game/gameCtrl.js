let Game = require('../../models/game');
let User = require('../../models/user');
let util = require('../../helpers/util');
let notif = require('../cron/newGame');
let timer = require('../cron/timer');
const socket = require('./broadcaster');

const addUser = (req,res) => {
  util.getUserId(req.headers.token, (err,decoded) => {
    console.log(req.body)
    // console.log('add user ah')
    if (err) res.send({err:'Invalid token'});
    else if ( typeof req.body.game_id === 'undefined') res.send({err:'GameId must be filled'})
    else
      Game.findById(req.body.game_id, (err,game) => {
        // console.log(err.message);

        // console.log('-------------------------------');
        // console.log(game);
        // console.log('------------------------------xx');
        if (err) res.send({err:err.message})
        else {
          if (typeof game.userList === 'undefined') game.userList = [];
          console.log(game.userList);
          // let idx = game.userList.findIndex(list => list.game_id == decoded.id);
          if (game.userList) {
            User.findById(decoded.id, (err,user)=>{
              if (err) res.send({err:'UserId is not exist'});
              else {
                user.gameList.push({game_id: req.body.game_id, score:0});
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
  // console.log('--------------------------------------aaa')
  if ( typeof req.body.game_id === 'undefined') res.send({err:'GameId must be filled'})
  else if (typeof req.body.score === 'undefined') res.send({err:'Score must be filled'});
  else
    util.getUserId(req.headers.token, (err,decoded) => {
      // console.log('-----------------------------------------1');
      if (err) res.send({err:'Invalid userId'})
      else
        Game.findById(req.body.game_id, (err,game) => {

            // console.log('----------------------------xx');
          // console.log(err);
          // console.log(game);
          if (err) res.send({err:err.message})
          else if (typeof game.userList === 'undefined') res.send({err:'Invalid userId'});
          else {
            let idx = game.userList.findIndex((list) => list._user == decoded.id);
            console.log('idx: '+idx)
            if (! game.userList) res.send({err:'Invalid userId'});
            else {
              //update User : totalScore, gameList
              //update Game: userList
              User.findById(decoded.id, (err,user)=>{
                if (err) res.send({err:'UserId is not exist'});
                else {
                  // let idx = game.userList.findIndex(g => g._user == r);
                  // console.log('put '+idx);
                  if (idx !== -1) user.gameList[idx].score = req.body.score
                  user.totalScore += parseInt(req.body.score);
                    //
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
  console.log(req.body.time);
  let newGame = new Game(req.body);
  newGame.save((err,game) => {
    if (err) {
      let err_msg = '';
      for (let error in err.errors) err_msg += err.errors[error].message+'\n';
      res.send({err:err_msg})
    } else {
      socket.writeUserData(game._id,false);
      console.log('gametime '+game.time);
      timer.setTimer(game._id, game.time, true);
      User.find({}, (err, users) => {
        if(err) console.log('Game notification failed');
        users.forEach(user => {
          notif.newGame(user, game.time);
        })
      })
      var time = game.time;
      time.setMinutes(time.getMinutes() + 2);
      timer.setTimer(game._id, time, false);
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
