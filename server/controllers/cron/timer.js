'use strict'
require('dotenv').config();
const cronJob = require('cron').CronJob;
const kue = require('kue');
const queue = kue.createQueue();
const socket = require('../game/broadcaster');

const setTimer = (gameId, time) => {
  console.log('Ini memanggil set timer');
  time.setMinutes(time.getMinutes() + 1)
  var timeString = `${time.getMinutes() + 1} ${time.getHours() - 1} ${time.getDate()} ${time.getMonth()} *`;
  console.log(timeString);
  new cronJob(timeString, function() {
    console.log('Ini mengubah status game menjadi true');
    socket.writeUserData(gameId,true);
  }, null, true, 'Asia/Jakarta');
}

module.exports = {
  setTimer
};
