const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment-timezone');
const _ = require('lodash');
const mongoose = require('mongoose');
const {
  User
} = require('./models/user.js');
const {
  authenticate
} = require('./middleware/authenticate.js')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ratingsystem', {
  useMongoClient: true
});


var app = express();
app.use(bodyParser.json());
//註冊
app.post('/signup', (req, res) => {
  var body = _.pick(req.body, ['email', 'password', 'name', 'phone', 'studentID', 'department', 'lineId', 'roleId'])
  body.time = Date.now();
  var user = new User(body);
  user.save().then(() => {
    user.generateToken();
  }).then((token) => {
    res.header('authToken', token).send(user.name);
  }).catch((error) => {
    res.status(400).send(error);
  })
})

//登入
app.post('/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateToken().then((token) => {
      res.header('authToken', token).send()
    }).catch((e) => {
      res.status(403).send("TOKEN 錯誤");
    })
  }).catch((e) => {
    res.status(403).send(e);
  })
})

app.get('/checkme', authenticate, (req, res) => {
  var user = req.user;
  var objUser = user.toJson();
  console.log(req.user);
  res.send(objUser);
})

app.listen(3000, () => {
  console.log(moment().tz("Asia/Taipei").format());
  console.log("http://localhost:3000")
})