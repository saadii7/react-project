// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');

const users = require('./routes/user');
const sports=require('./routes/sport');
const teams=require('./routes/team');

const events=require('./routes/events');
const notification=require('./routes/notification');
const teampost=require('./routes/teampost');
////////////
const usersports=require('./routes/user_sport');
const userteams=require('./routes/user_team');

// const events=require('./routes/events');




mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/sports',sports);
app.use('/api/teams',teams);
app.use('/api/teamPost',teampost);
app.use('/api/notification',notification);
app.use('/api/events',events);
app.use('/api/usersport',usersports);
app.use('/api/userteam',userteams);

app.get('/', function(req, res) {
    res.send('hello');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
