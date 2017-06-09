const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../app');
let should = chai.should();
const util = require('../helpers/util');

let User = require('../models/user');
let _id = '';
let _iduser ='';
let _iduser2 = '';
let _token = '';
let _tokenuser = '';

describe('User', () => {
  before( done => {
    User.remove({}, err=>{done();});
  })

  describe('POST /users', () => {
    let email = 'lycaans@gmail.com';
    let role = 'user';
    let password = 'lycaanspassword';
    let phone = '+6285813372797';
    let name = 'lycaans';

    let email2 = 'mbakee@gmail.com';
    let role2 = 'user';
    let password2 = 'mbakeepassword';
    let phone2 = '+6285813372797';
    let name2 = 'mbakee';

    let adminemail = 'admin@gmail.com';
    let adminrole = 'admin';
    let adminpassword = 'adminpassword';
    let adminphone="+6285813372797";
    let adminname= 'adminname';

    let login_dt = {
      email: email,
      password: password
    }

    let login_dt_adm = {
      email: adminemail,
      password: adminpassword
    }

    let newAdmin = {
      email: adminemail,
      password: adminpassword,
      role: adminrole,
      phone: adminphone,
      name: adminname
    }

    let newUser = {
      email: email,
      password: password,
      role: role,
      phone: phone,
      name: name
    }

    let newUser2 = {
      email: email2,
      password: password2,
      role: role2,
      phone: phone2,
      name: name2
    }

    it('should insert new admin', (done)=> {

      chai.request(server)
      .post('/api/users')
      .send(newAdmin)
      .end((err,user) => {
        if (err) done(err);
        else if (user.body.hasOwnProperty('err')) done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('email',adminemail);
          user.body.should.have.property('password');
          user.body.should.have.property('role',adminrole);
          user.body.should.have.property('phone',adminphone);
          user.body.should.have.property('_id');
          _id = user.body._id;
          done();
        }

      })
    })

    it('should insert new user', (done)=> {

      chai.request(server)
      .post('/api/users')
      .send(newUser)
      .end((err,nuser)=>{
        if (err) done(err);
        else if (nuser.body.hasOwnProperty('err')) done(err);
        else {
          nuser.should.have.status(200);
          nuser.body.should.be.a('object');
          nuser.body.should.have.property('email',email);
          nuser.body.should.have.property('password');
          nuser.body.should.have.property('role',role);
          nuser.body.should.have.property('phone',phone);
          nuser.body.should.have.property('_id');
          _iduser = nuser.body._id;
          done();
        }

      })
    })

    it('should insert new user 2', (done)=> {
      // console.log('-------------------------');
      // console.log(newUser2);
      chai.request(server)
      .post('/api/users')
      .send(newUser2)
      .end((err,nuser)=>{
        // console.log(err);
        if (err) done(nuser.body.err);
        else if (nuser.body.hasOwnProperty('err')) done(err);
        else {
          // console.log(nuser.body);
          nuser.should.have.status(200);
          nuser.body.should.be.a('object');
          nuser.body.should.have.property('email',email2);
          nuser.body.should.have.property('password');
          nuser.body.should.have.property('role',role);
          nuser.body.should.have.property('phone',phone2);
          nuser.body.should.have.property('_id');
          _iduser2 = nuser.body._id;
          // console.log('id user2 '+_iduser2)
          done();
        }

      })
    })

    it('should get token after login -user',(done) => {
      chai.request(server)
      .post('/login')
      .send(login_dt)
      .end((err,user)=>{
        if (err) done(err);
        else if (user.body.hasOwnProperty('err')) done(err);
        else {
          _tokenuser = user.body.token;
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('token');
          done();
        }
      });
    });

  it('should get token after login -admin',(done) => {
    chai.request(server)
    .post('/login')
    .send(login_dt_adm)
    .end((err,user)=>{
      if (err) done(err);
      else if (user.body.hasOwnProperty('err')) done(err);
      else {
        _token = user.body.token;
        user.should.have.status(200);
        user.body.should.be.a('object');
        user.body.should.have.property('token');
        done();
      }
    });
  });

    it('should not insert new user - duplicate email', (done) => {
      let newUser = {
        email: email,
        password: password,
        role: role,
        phone: phone
      }
      chai.request(server)
      .post('/api/users')
      .send(newUser)
      .end((err,user)=>{
        if (err) done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('err');
          done();
        }

      })
    })
    it('should not insert new user - invalid role', (done) => {
      let newUser = {
        email: email2,
        password:password,
        phone:phone,
        role: 'mbak',
      }
      chai.request(server)
      .post('/api/users')
      .send(newUser)
      .end((err,user)=>{
        if (err) done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('err');
          done();
        }

      })
    })
    it('should not insert new user - empty email - password - phone', (done) => {
      let newUser = {
        role: role,
      }
      chai.request(server)
      .post('/api/users')
      .send(newUser)
      .end((err,user)=>{
        if (err) done(err);
        else if (user.body.hasOwnProperty('err')) done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('err');
          // _id = user.body._id;
          // console.log('habis post: '+_id);
          done();
        }

      })
    })
  });

  describe('GET /api/users',() => {
    it('should get all users', (done) => {
      chai.request(server)
      .get('/api/users')
      .set('token', _token)
      .end((err,users)=>{
        if (err) done(err);
        else if (users.body.hasOwnProperty('err')) done(err);
        else {
          users.should.have.status(200);
          users.body.should.be.a('array');
          users.body.length.should.eql(3);
          done();
        }
      })
    })

    it('should not get all users - no token', (done) => {
      chai.request(server)
      .get('/api/users')
      .end((err,users)=>{
          users.should.have.status(200);
          users.body.should.have.property('err');
          done();

      })
    })

    it('should not get all users - not enough access', (done) => {
      chai.request(server)
      .get('/api/users')
      .set('token', _tokenuser)
      .end((err,users)=>{
          users.should.have.status(200);
          users.body.should.have.property('err');
          done();
      })
    })

  })

  describe('GET:id /api/users',() => {
    it('should getUserByID as admin', (done)=> {
      chai.request(server)
      .get(`/api/users/${_iduser}`)
      .set('token',_token)
      .end((err,user) => {
        if (err) done(err);
        else if (user.body.hasOwnProperty('err')) done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');

          user.body.should.have.property('_id').eql(_iduser);
          done();
        }
      })
    })
    it('should getUserByID as user', (done)=> {
      chai.request(server)
      .get(`/api/users/${_iduser}`)
      .set('token',_tokenuser)
      .end((err,user)=>{
        if (err) done(err);
        else if (user.body.hasOwnProperty('err')) done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('_id').eql(_iduser);
          done();
        }
      })
    })
  })

  describe('PUT:id /api/users',() => {
    let nama2 = 'Arthur Pendagron';
    let updUser = { nama:nama2 };

    it('should update', (done)=> {
      chai.request(server)
      .put(`/api/users/${_iduser}`)
      .send(updUser)
      .set('token',_token)
      .end((err,user) => {
        if (err) done(err);
        else if (user.body.hasOwnProperty('err')) done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('_id').eql(_iduser);
          done();
        }
      })
    })
    it('should failed to update - access', (done)=> {
      chai.request(server)
      .put(`/api/users/${_id}`)
      .send(updUser)
      .set('token',_tokenuser)
      .end((err,user)=>{
        if (err) done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('err');
          done();
        }
      })
    })
  });

  describe('DELETE:id /api/users', ()=>{
    it('should success to delete', (done)=> {
      chai.request(server)
      .delete(`/api/users/${_iduser2}`)
      .set('token',_token)
      .end((err,user) => {
        if (err) done(err);
        else if (user.body.hasOwnProperty('err')) done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('_id').eql(_iduser2);
          done();
        }
      })
    })
    it('should failed to delete - access', (done)=> {
      chai.request(server)
      .delete(`/api/users/${_id}`)
      .set('token',_tokenuser)
      .end((err,user)=>{
        if (err) done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('err');
          done();
        }
      })
    })
  })

  after( done => {
    global._token = _token;
    global._tokenuser = _tokenuser;
    global._id = _id;
    global._iduser = _iduser;
    done();
  });


})