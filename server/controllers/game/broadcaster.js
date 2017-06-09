require('dotenv').config();
const firebase = require("firebase");

var config = {
  apiKey: process.env.FIREBASE_apiKey ,
  authDomain: process.env.FIREBASE_authDomain ,
  databaseURL: process.env.FIREBASE_databaseURL ,
  storageBucket: process.env.FIREBASE_storageBucket ,
  messagingSenderId: process.env.FIREBASE_senderId
};

firebase.initializeApp(config);

let database = firebase.database();

function writeUserData(id, start) {
  database.ref('game/' + id).set({
    //id: id,
    start: start,
  });
  console.log('Write ke firebase success');
}

//copy untuk ke listener
var listenSlide = database.ref('game/');
listenSlide.on('value', function(game) {
  if (game.val()) {
    if (game.val().hasOwnProperty('status')) {
      console.log(game.val())
    } else console.log('kog gini sih')
  }
});

module.exports = {
  writeUserData
}
