require('dotenv').config();
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const pageUser = {
  hasParam: {
    GET : ['id'],
    PUT: ['admin','id'],
    DELETE: ['admin']
  },
  noParam: {
    GET: ['admin']
  }
}

const pageGame = {
  hasParam : {
    PUT: ['admin'],
    DELETE: ['admin']
  },
  noParam: {
    POST:['admin'],
    GET:['admin']
  }
}

const pageMain = {
  noParam: {
    POST: ['login'],
    PUT: ['login']
  }
}
const authMain = (req,res,next) => {
  // console.log('lagi auth main')
  let path = 'api/games/main';
  let method = req.method;
  let is_user_auth = -1;
  let user_auth = (typeof req.params.id !== 'undefined'? pageMain.hasParam[method] : pageMain.noParam[method]);
  if (user_auth) {
    let token = req.headers.token;
    if (token) {
      let decoded = jwt.verify(token,SECRET_KEY);
      if (user_auth)
        is_user_auth = user_auth.findIndex((x)=>
          ( x === 'login' || (decoded.role === x) || (x === 'id' && decoded.id == req.params.id ) )
        );

      if (is_user_auth === -1) res.send({err:`User ${decoded.email} - role ${decoded.role} tak dapat mengakses ${path} ${method}`});
      else next();
    } else res.send({err:'You must login'});
  } else next();
}

const authGame = (req,res,next) => {
  // console.log('lagi auth game')
  let path = 'api/games/';
  let method = req.method;
  let is_user_auth = -1;
  let user_auth = (typeof req.params.id !== 'undefined'? pageGame.hasParam[method] : pageGame.noParam[method]);
  if (user_auth) {
    let token = req.headers.token;
    if (token) {
      let decoded = jwt.verify(token,SECRET_KEY);
      if (user_auth)
        is_user_auth = user_auth.findIndex((x)=>
          ( x === 'login' || (decoded.role === x) || (x === 'id' && decoded.id == req.params.id ) )
        );

      if (is_user_auth === -1) res.send({err:`User ${decoded.email} - role ${decoded.role} tak dapat mengakses ${path} ${method}`});
      else next();
    } else res.send({err:'You must login'});
  } else next();
}

const authUser = (req,res,next) => {
  // console.log('lagi auth user')
  let path = 'api/users/';
  let method = req.method;
  let is_user_auth = -1;
  let user_auth = (typeof req.params.id !== 'undefined'? pageUser.hasParam[method] : pageUser.noParam[method]);
  if (user_auth) {
    let token = req.headers.token;
    if (token) {
      let decoded = jwt.verify(token,SECRET_KEY);
      if (user_auth)
        is_user_auth = user_auth.findIndex((x)=>
          ( x === 'login' || (decoded.role === x) || (x === 'id' && decoded.id == req.params.id ) )
        );

      if (is_user_auth === -1) res.send({err:`User ${decoded.email} - role ${decoded.role} tak dapat mengakses ${path} ${method}`});
      else next();
    } else res.send({err:'You must login'});
  } else next();
}


const getUserId = (token,callback) => {
  jwt.verify(token, SECRET_KEY, callback);

}

const getUserDetail = (token) => {
  jwt.verify(token, SECRET_KEY, (err,decoded)=>{
    return err? false : decoded;
  });
}

const createToken = (user_data) => {
  let token = jwt.sign(user_data, SECRET_KEY)
  return token;
}

const hashPassword = (password) => {
  let hashPassword = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
  return hashPassword;
}

const checkPassword = (password,hashPassword) => {
  let plainpass  = CryptoJS.AES.decrypt(hashPassword, SECRET_KEY).toString(CryptoJS.enc.Utf8);
  return plainpass === password;
}

module.exports = {
  authMain,
  authUser,
  authGame,
  hashPassword,
  getUserId,
  getUserDetail,
  createToken,
  checkPassword
}