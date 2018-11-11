const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {User} = require('./models/user.js');
const moment = require('moment-timezone');
const {ObjectID} = require('mongodb')
const {authenticate} = require('./middleware/authenticate.js')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TutRatingSystem', { useMongoClient: true });


var app = express();
app.use(bodyParser.json());


//註冊
app.post('/signup',(req, res) => {
  var body = _.pick(req.body, ['email', 'password', 'name', 'phone', 'studentId', 'department', 'lineId', 'roleId'])
  body.time = new Date().toString();
  var user = new User(body);
  user.save().then(() => {
    user.generateAuthToken();
  }).then((token) => {
    res.header('authToken', token).send(user.name);
  }).catch((e) => {
    res.status(400).send(e);
  })
});
//登入
app.post('/signin', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('authToken', token).send();
    }).catch(() => {
      res.status(403).send();
    })
  })
})

app.get('/me', authenticate, (req, res) => {
  var user = req.user
  var objUser = user.toJson()
  res.send(objUser);
})



app.listen(3000, () => {
  var moment = require('moment-timezone');
console.log(moment().tz("Asia/Taipei").format())
console.log("http://localhost:3000")

})