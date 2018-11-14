const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment-timezone');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const {
  ObjectID
} = require('mongodb');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: (value) => {
        validator.isEmail(value)
      },
      message: '不是合法信箱'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    minlength: 1
  },
  phone: {
    type: String,
    required: true,
    minlength: 6
  },
  time: {
    type: Date
  },
  studentID: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  lineId: {
    type: String
  },
  roleId: {
    type: String,
    required: true
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]

})

UserSchema.methods.generateToken = function () {
  var user = this;
  var access = user.roleId;
  var token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, 'abc123').toString();

  user.tokens.push({
    access,
    token
  });
  return user.save().then(() => {
    return token
  })
}

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({
    email
  }).then(user => {
    if (!email) {
      return Promise.reject("找不到這個信箱");
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password).then(res => {
        if (res) {
          resolve(user)
        } else {
          reject("密碼錯誤喔!!")
        }
      })
    })
  })
}
UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {

    decoded = jwt.verify(token, 'abc123')
  } catch (e) {

    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': decoded.access
  })
}

UserSchema.methods.toJson = function () {
  var user = this;
  var userObj = user.toObject();
  return _.pick(userObj, ['_id', 'email', 'phone', 'studentId', 'department', 'roleId'])
}

UserSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.hash(user.password, 10).then(hash => {
      user.password = hash;
      next();
    })
  } else {
    next();
  }
})

var User = mongoose.model('User', UserSchema);

module.exports = {
  User
}