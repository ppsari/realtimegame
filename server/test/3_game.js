const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../app');
let should = chai.should();
const util = require('../helpers/util');
let Game = require('../models/game');

let _id;
let _iduser;
let _token;
let _tokenuser;

let _gid;
let _gid2;

describe('Game', () => {
  before( done => {
    console.log('========================================================');
    _id = global._id;
    _iduser = global._iduser;
    _token =  global._token;
    _tokenuser =  global._tokenuser;
    Game.remove({}, err=>{done();});
  })

  let name = "gamename1";
  let time = "2017-08-09T15:20:21.000Z";
  let difficulty = 'easy';
  let category = 9;

  let name2 = "gamename2";
  let time2 = "2017-08-10T15:20:21.000Z";
  let difficulty2 = 'medium';
  let category2 = 13;

  let invalid_gid = 'asdadas31231asdsa';

  describe('POST /api/games', function(done) {
    let game = {
      name: name,
      time: time,
      difficulty: difficulty,
      category : category
    }
    let game2 = {
      name: name2,
      time: time2,
      difficulty: difficulty2,
      category : category2
    }
    let wronggame = {};
    let wrongdifficulty = 'taudeh';

    it('should create a new game', done => {
      chai.request(server)
      .post('/api/games')
      .send(game)
      .set('token',_token)
      .end((err,game) => {
        if (err) done(game.body.err);
        else if (game.body.hasOwnProperty('err')) done(err);
        else {
          game.should.have.status(200);
          game.body.should.be.a('object');
          game.body.should.have.property('name',name);
          game.body.should.have.property('time',time);
          game.body.should.have.property('difficulty',difficulty);
          game.body.should.have.property('category',category);
          game.body.should.have.property('_id');
          _gid = game.body._id;
          console.log('id game '+_gid)
          done();
        }
      });
    });

    it('should create a new game2', done => {
      chai.request(server)
      .post('/api/games')
      .send(game2)
      .set('token',_token)
      .end((err,game2) => {
        if (err) done(game2.body.err);
        else if (game2.body.hasOwnProperty('err')) done(err);
        else {
          game2.should.have.status(200);
          game2.body.should.be.a('object');
          game2.body.should.have.property('name',name2);
          game2.body.should.have.property('time',time2);
          game2.body.should.have.property('difficulty',difficulty2);
          game2.body.should.have.property('category',category2);
          game2.body.should.have.property('_id');
          _gid2 = game2.body._id;
          console.log('id game2 '+_gid2)
          done();
        }
      });
    });

    it('shouldnt create a new game - wrong difficulty',done => {
      game2.difficulty = wrongdifficulty;
      chai.request(server)
      .post('/api/games')
      .send(game2)
      .set('token',_token)
      .end((err,game) => {
          game.should.have.status(200);
          game.body.should.be.a('object');
          game.body.should.have.property('err');
          console.log('err:\n'+game.body.err);
          done();
      });
    });
    it('shouldnt create a new game - [name-time-difficulty-category] empty',done => {

      chai.request(server)
      .post('/api/games')
      .send({})
      .set('token',_token)
      .end((err,game) => {
          game.should.have.status(200);
          game.body.should.be.a('object');
          game.body.should.have.property('err');
          console.log('err:\n'+game.body.err);
          done();
      });
    });
    it('shouldnt create a new game - no token',done => {
      chai.request(server)
      .post('/api/games')
      .send(game)
      .end((err,game) => {
        if (err) done(err);
        else {
          game.should.have.status(200);
          game.body.should.be.a('object');
          game.body.should.have.property('err');
          console.log('err:\n'+game.body.err);
          done();
        }
      });
    });
    it('shouldnt create a new game - no access',done => {
      chai.request(server)
      .post('/api/games')
      .send(game)
      .set('token',_tokenuser)
      .end((err,game) => {
        if (err) done(err);
        // if (game.body.hasOwnProperty('err') === false) done(game.body.err);
        else {
          game.should.have.status(200);
          game.body.should.be.a('object');
          game.body.should.have.property('err');
          console.log('err:\n'+game.body.err);
          done();
        }
      });
    });
  });

  describe('GET /api/games', function(done) {
    it('should get all games',done => {
      chai.request(server)
      .get('/api/games')
      .set('token', _token)
      .end((err,games)=>{
        if (err) done(err);
        else if (games.body.hasOwnProperty('err')) done(err);
        else {
          games.should.have.status(200);
          games.body.should.be.a('array');
          games.body.length.should.eql(2);
          done();
        }
      })
    });
    it('should not get game - no token',done => {
      chai.request(server)
      .get('/api/games')
      .end((err,games)=>{
        if (err) done(err);
        else {
          games.should.have.status(200);
          games.body.should.have.property('err');
          console.log('err:\n'+games.body.err);
          done();
        }
      })
    });
    it('should not get game - no access',done => {
      chai.request(server)
      .get('/api/games')
      .set('token',_tokenuser)
      .end((err,games)=>{
        if (err) done(err);
        else {
          games.should.have.status(200);
          games.body.should.have.property('err');
          console.log('err:\n'+games.body.err);
          done();
        }
      })
    });
  });
  describe('GET:id /api/games', function(done) {
    it('should get gamebyID',done => {
      chai.request(server)
      .get(`/api/games/${_gid}`)
      .set('token',_token)
      .end((err,game) => {
        if (err) done(err);
        else if (game.body.hasOwnProperty('err')) done(err);
        else {
          game.should.have.status(200);
          game.body.should.be.a('object');

          game.body.should.have.property('_id').eql(_gid);
          done();
        }
      })
    });
    it('should not get gamebyID - no token',done => {
      chai.request(server)
      .get(`/api/games/${_gid}`)
      .end((err,game) => {
        if (err) done(err);
        else {
          game.should.have.status(200);
          game.body.should.be.a('object');
          game.body.should.have.property('err');
          console.log('err:\n'+game.body.err);
          done();
        }
      })
    });
    it('should not get gamebyID - no access',done => {
      chai.request(server)
      .get(`/api/games/${_gid}`)
      .set('token',_tokenuser)
      .end((err,game) => {
        if (err) done(err);
        else {
          game.should.have.status(200);
          game.body.should.be.a('object');
          game.body.should.have.property('err');
          console.log('err:\n'+game.body.err);
          done();
        }
      })
    });
    it('should not get gamebyID - invalid gameId',done => {
      chai.request(server)
      .get(`/api/games/${invalid_gid}`)
      .set('token',_tokenuser)
      .end((err,game) => {
        if (err) done(err);
        else {
          game.should.have.status(200);
          game.body.should.be.a('object');
          game.body.should.have.property('err');
          console.log('err:\n'+game.body.err);
          done();
        }
      })
    });
  });
  describe('PUT:id /api/games', function(done) {
    let nameedited = name+'ed';
    it('should edit gamebyID',done => {
      chai.request(server)
      .put(`/api/games/${_gid}`)
      .send({name:nameedited})
      .set('token',_token)
      .end((err,game) => {
        if (err) done(err);
        else if (game.body.hasOwnProperty('err')) done(err);
        else {
          game.should.have.status(200);
          game.body.should.be.a('object');
          game.body.should.have.property('_id').eql(_gid);
          game.body.should.have.property('name',nameedited);
          done();
        }
      })
    });
    it('should not edit gamebyID - no token',done => {
      chai.request(server)
      .put(`/api/games/${_gid}`)
      .send({name:nameedited})
      .end((err,game) => {
        if (err) done(err);
        else {
          game.should.have.status(200);
          game.body.should.be.a('object');
          game.body.should.have.property('err');
          console.log('err:\n'+game.body.err);
          done();
        }
      })
    });
    it('should not edit gamebyID - no access',done => {
      chai.request(server)
      .put(`/api/games/${_gid}`)
      .send({name:nameedited})
      .set('token',_tokenuser)
      .end((err,game) => {
        if (err) done(err);
        else {
          game.should.have.status(200);
          game.body.should.be.a('object');
          game.body.should.have.property('err');
          console.log('err:\n'+game.body.err);
          done();
        }
      })
    });
    it('should not edit gamebyID - invalid gameId',done => {
      chai.request(server)
      .put(`/api/games/${invalid_gid}`)
      .send({name:nameedited})
      .end((err,game) => {
        if (err) done(err);
        else {
          game.should.have.status(200);
          game.body.should.be.a('object');
          game.body.should.have.property('err');
          console.log('err:\n'+game.body.err);
          done();
        }
      })
    });
  });
  describe('POST /api/maingames', function(done) {
    let invalidMain = 'asdasdasd2312312';
    it('should insert user to game byID',done => {
      chai.request(server)
      .post('/api/maingames')
      .send({game_id : _gid})
      .set('token',_tokenuser)
      .end((err,main) => {
        if (err) done(main.body.err);
        else if (main.body.hasOwnProperty('err')) done(err);
        else {
          main.should.have.status(200);
          main.body.should.be.a('object');
          main.body.should.have.property('userList');
          main.body.should.have.property('_id',_gid);
          _gid = main.body._id;
          console.log('id main '+_gid)
          done();
        }
      });
    });
    it('should not insert user to game byID - no token',done => {
      chai.request(server)
      .post('/api/maingames')
      .send({game_id : _gid})
      .end((err,main) => {
        if (err) done(err);
        else {
          main.should.have.status(200);
          main.body.should.be.a('object');
          main.body.should.have.property('err');
          console.log('err:\n'+main.body.err);
          done();
        }
      });
    });
    it('should not insert user to game byID - invalid gameId',done => {
      chai.request(server)
      .post('/api/maingames')
      .send({game_id : invalid_gid})
      .set('token',_tokenuser)
      .end((err,main) => {
        if (err) done(err);
        else {
          main.should.have.status(200);
          main.body.should.be.a('object');
          main.body.should.have.property('err');
          console.log('err:\n'+main.body.err);
          done();
        }
      });
    });
    it('shouldnt insert user to game byID - duplicate user',done => {
      chai.request(server)
      .post('/api/maingames')
      .send({game_id : _gid})
      .set('token',_tokenuser)
      .end((err,main) => {
        if (err) done(err);
        else {
          main.should.have.status(200);
          main.body.should.be.a('object');
          main.body.should.have.property('err');
          console.log('err:\n'+main.body.err);
          done();
        }
      });
    });
  });
  describe('PUT /api/maingames', function(done) {
    let score = 70;
    let invalid_score = 'dsad';
    it('should updt userScore to game byID',done => {
      chai.request(server)
      .put('/api/maingames')
      .send({game_id : _gid, score:score})
      .set('token',_tokenuser)
      .end((err,main) => {
        if (err) done(main.body.err);
        else if (main.body.hasOwnProperty('err')) done(err);
        else {
          main.should.have.status(200);
          main.body.should.be.a('object');
          main.body.should.have.property('userList');
          main.body.should.have.property('_id',_gid);
          _gid = main.body._id;
          console.log('id main '+_gid)
          done();
        }
      });
    });
    it('should not updt userScore to game byID - invalid score',done => {
      chai.request(server)
      .put('/api/maingames')
      .send({game_id : _gid, score:invalid_score})
      .set('token',_tokenuser)
      .end((err,main) => {
        if (err) done(err);
        else {
          main.should.have.status(200);
          main.body.should.be.a('object');
          main.body.should.have.property('err');
          console.log('err:\n'+main.body.err);
          done();
        }
      });
    });

    it('should not updt userScore to game byID - no token',done => {
      chai.request(server)
      .put('/api/maingames')
      .send({game_id : _gid, score:score})
      .end((err,main) => {
        if (err) done(err);
        else {
          main.should.have.status(200);
          main.body.should.be.a('object');
          main.body.should.have.property('err');
          console.log('err:\n'+main.body.err);
          done();
        }
      });
    });
    it('should not updt userScore to game byID - no access',done => {
      chai.request(server)
      .put('/api/maingames')
      .send({game_id : _gid, score:score})
      .set('token',_token)
      .end((err,main) => {

        if (err) done(err);
        else {
          main.should.have.status(200);
          main.body.should.be.a('object');
          main.body.should.have.property('err');
          console.log('err:\n'+main.body.err);
          done();
        }
      });
    });
    it('should not updt userScore to game byID - invalid gameId',done => {
      chai.request(server)
      .put('/api/maingames')
      .send({game_id : invalid_gid, score:score})
      .set('token',_tokenuser)
      .end((err,main) => {
        if (err) done(err);
        else {
          main.should.have.status(200);
          main.body.should.be.a('object');
          main.body.should.have.property('err');
          console.log('err:\n'+main.body.err);
          done();
        }
      });
    });
  });
  describe('DELETE:id /api/games', function(done) {
    it('should delete gamebyID',done => {
      chai.request(server)
      .delete(`/api/games/${_gid2}`)
      .set('token',_token)
      .end((err,game) => {
        if (err) done(err);
        else if (game.body.hasOwnProperty('err')) done(err);
        else {
          game.should.have.status(200);
          game.body.should.be.a('object');
          game.body.should.have.property('_id').eql(_gid2);
          done();
        }
      });
    });
    it('should not delete gamebyID - no token',done => {
      chai.request(server)
      .delete(`/api/games/${_gid}`)
      .end((err,game) => {
        console.log(err);
        console.log(game.body);
        if (err) done(err);
        else {
          game.should.have.status(200);
          game.body.should.be.a('object');
          game.body.should.have.property('err');
          console.log('err:\n'+game.body.err);
          done();
        }
      });
    });
    it('should not delete gamebyID - no access',done => {
      chai.request(server)
      .delete(`/api/games/${_gid}`)
      .set('token',_tokenuser)
      .end((err,game) => {
        if (err) done(err);
        else {
          game.should.have.status(200);
          game.body.should.be.a('object');
          game.body.should.have.property('err');
          console.log('err:\n'+game.body.err);
          done();
        }
      });
    });
    it('should not delete gamebyID - invalid gameId',done => {
      chai.request(server)
      .delete(`/api/games/${invalid_gid}`)
      .set('token',_token)
      .end((err,game) => {
        if (err) done(err);
        else {
          game.should.have.status(200);
          game.body.should.be.a('object');
          game.body.should.have.property('err');
          console.log('err:\n'+game.body.err);
          done();
        }
      });
    });

  });
});