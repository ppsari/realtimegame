let User = require('../models/user');
const util = require('../helpers/util');
const afterRegister = require('./cron/afterRegister');

const login = (req,res) => {
  // console.log('halo')
  if (typeof req.body.email === 'undefined') res.send({err:'Email must be filled'});
  else if (typeof req.body.password === 'undefined') res.send({err:'Password must be filled'});
  else {
    User.findOne({email:req.body.email}, (err,user) => {
      if (err || user === null) res.send({err:'Invalid User'})
      else if (user !== null) {
        let user_dt = {
          email : user.email,
          id : user._id,
          role: user.role
        };
        if (util.checkPassword(req.body.password,user.password)) {
          let token = util.createToken(user_dt);
          res.send({token:token,role:user.role, _id:user._id});
        }
        else res.send({err:'password salah'});
      }
    });
  }

}

const register = (req,res) => {
  // console.log('masukkk');
  let user = {};
  for (let key in req.body) user[key] = req.body[key];
  user.score = 0;
  user.role = 'user';

  let newuser = new User(user);

  newuser.save((err,user)=>{
    if (err) {
      let err_msg = '';
      for (let error in err.errors) err_msg += err.errors[error].message+'\n';
      if (err.code == 11000) err_msg+= `Username exist`;
      res.send({err:err_msg});
    } else {
      user.save((err_hash,user)=>{
        if (err_hash) res.send({err:'Hash password failed'});
        else {
          afterRegister(user)
          res.send({scs:'User Inserted'});
        }
      })
    };
  })
}


module.exports = {
  login,
  register
}
