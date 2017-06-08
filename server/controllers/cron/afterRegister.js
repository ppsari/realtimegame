var CronJob = require('cron').CronJob;
var kue = require('kue'), queue = kue.createQueue();
var nodemailer = require('nodemailer');
var nexmo = require('nexmo');
require('dotenv').config();

//console.log(process.env.PASSWORD);
let transporter = nodemailer.createTransport({
  service: 'gmail.com',
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
  }
});

// objEmail = {from, to, subject, html}

function sendEmail(obj) {
  var job = queue.create('notif', obj).save( function(err){
     if( !err ) {
       console.log("This is the result", job.data);
     }
  });

  queue.process('notif', function(job, done){
    transporter.sendMail(job.data, function(error, info){
      console.log("This is the result", job.data);
      console.log("This is the info", info);
       if(error){
           return console.log(error);
       }
       console.log('Message sent: ' + info.response);
     });
     done();
  });
}

//objMessage = {from, to, text}

function sendMessage(obj) {
  obj.api_key = process.env.NEXMO_KEY;
  obj.api_secret = process.env.NEXMO_SECRET;
  console.log(obj);
  var job = queue.create('notif', obj).save( function(err){
     if( !err ) {
       console.log("This is the result", job.data);
     }
  });

  queue.process('notif', function(job, done){
    var https = require('https');
    var options = {
     host: 'rest.nexmo.com',
     path: '/sms/json',
     port: 443,
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Content-Length': Buffer.byteLength(JSON.stringify(job.data))
     }
    };
    var req = https.request(options);
    req.write(JSON.stringify(job.data));
    req.end();

    var responseData = '';
    req.on('response', function(res){
     res.on('data', function(chunk){
       responseData += chunk;
     });

     res.on('end', function(){
       console.log(JSON.parse(responseData));
     });
    });
    done();
  });
}

// obj = {fromEmail, toEmail, emailSubject, emailHTML, fromPhone, toPhone, messageText}

function registerNotif(time, obj) {
  var timeString = `${time.getMinutes() + 1} ${time.getHours())} ${time.getDate()} ${time.getMonth()} *`;
  new CronJob(timeString, function() {
    // if email address provided
    if obj.hasOwnProperty(toEmail) {
      let emailObj = {
        from: obj.fromEmail,
        to: obj.toEmail,
        subject: obj.emailSubject,
        html: obj.emailHTML
      }
      sendEmail(emailObj);
    }
    // if phone number provided
    if obj.hasOwnProperty(toPhone) {
      let phoneObj = {
        from: obj.fromPhone,
        to: obj.toPhone,
        text: obj.phoneText
      }
      sendMessage(phoneObj);
    }
  }, null, true, 'Asia/Jakarta');

module.exports = {
  registerNotif
}
