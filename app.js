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
mongoose.connect('mongodb+srv://taskapp:taskapp@cluster0-7hhag.mongodb.net/rating_system?retryWrites=true&w=majority', {
    useNewUrlParser: true
});


var app = express();
app.use(bodyParser.json());
//registered
app.post('/signup', (req, res) => {
    var body = _.pick(req.body, ['email', 'password', 'name', 'phone', 'roleId', 'roleString'])
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

//Sign in
app.post('/login', (req, res) => {
        var body = _.pick(req.body, ['email', 'password']);
        User.findByCredentials(body.email, body.password).then((user) => {
            return user.generateToken().then((token) => {
                res.header('authToken', token).send()
            }).catch((e) => {
                res.status(403).send("TOKEN");
            })
        }).catch((e) => {
            res.status(403).send(e);
        })
    })
    //giving rating
app.post('/givenrating', authenticate, async(req, res) => {

    var body = _.pick(req.body, ['email', 'password', 'roleString', 'rating', 'roleStringTo']);
    User.givenRating(body.email, body.password, body.roleString, body.rating.body.roleString).then((user) => {
        return user.generateToken().then((token) => {
            res.header('authToken', token).send()
        }).catch((e) => {
            res.status(403).send("TOKEN");
        })
    }).catch((e) => {
        res.status(403).send(e);
    })


})



//get ratting
app.get('/getratting', authenticate, async(req, res) => {
    try {
        var body = _.pick(req.body, ['email', 'password']);
        await User.AverageRatings(body.email, body.password).then((user) => {
            res.send(user)

        })


    } catch (e) {

        res.status(401).send();
    }
})

app.listen(3000, () => {
    console.log("Connect succeful");
    console.log("http://localhost:3000")
})