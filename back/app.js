// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');
const app = express();

var cors = require('cors');

const http = require('http').createServer(app);
// const io = require('socket.io')(http);
const whitelist = ['http://localhost:5000', 'http://localhost:3000'];
app.use(
    cors({
        origin: function(origin, callback) {
            console.log(origin);
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        enablePreflight: true,
        origin: true
    })
);

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
require('./routes/index');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {
        console.log('Database is connected');
    },
    err => {
        console.log('Can not connect to the database' + err);
    }
);

app.use(
    session({
        secret: 'gameon',
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);
app.use(passport.initialize());
app.use(passport.session());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//use sessions for tracking logins

app.use(function(req, res, next) {
    console.log('>>>>>>>>>>>>>>>>>>', req.user);
    if (
        req.headers &&
        (req.url.indexOf('/auth/login') !== -1 ||
            req.url.indexOf('/auth/register') !== -1 ||
            // req.url.indexOf('/socket.io') !== -1 ||
            req.url.indexOf('/auth/logout') !== -1)
    ) {
        next();
    } else if (req.url.indexOf('.map') == -1) {
        var token =
            req.headers.authorization ||
            req.query.token ||
            req.headers['x-access-token'];
        if (req.session && req.session.passport && req.session.passport.user) {
            req.session.nowInMinutes = Math.floor(Date.now() / 1e3) + 6 * 3600;
            next();
        } else {
            return res
                .status(380)
                .send({ message: 'Non Authenticated User, logging you out.' });
        }
    } else {
        next();
    }
});

app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/sports', require('./routes/sports'));
app.use('/teams', require('./routes/teams'));
app.use('/notifications', require('./routes/notifications'));
app.use('/events', require('./routes/events'));

app.get('/', function(req, res) {
    res.send('hello');
});
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
var io = require('socket.io').listen(server);
io.on('connection', () => {
    console.log('a user is connected');
});

app.set('io', io);
