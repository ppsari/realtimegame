'use strict'
require('dotenv').config();
const cronJob = require('cron').CronJob;
const kue = require('kue');
const queue = kue.createQueue();
const socket = require('../game/broadcaster');

const setTimer = (gameId, time, status) => {
  console.log('Ini memanggil set timer');
  var timeString = `${time.getMinutes() + 1} ${time.getHours()} ${time.getDate()} ${time.getMonth()} *`;
  new cronJob(timeString, function() {
    socket.writeUserData(gameId,status);
  }, null, true, 'Asia/Jakarta');
}

module.exports = {
  setTimer
};
