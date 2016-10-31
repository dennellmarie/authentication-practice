//require("")
var express = require("express");
var app = express();
//use passport to authorize users
var passport = require("passport");
var BasicStrategy = require('passport-http').BasicStrategy;
//use bcrypt to encrypt pw
var bcrypt = require('bcryptjs');

//create users
var users = [
    {'username': 'emily', 'password': '$2a$10$vwjoA/2HmEqE8ocax.7jk.zbFAwUZ158EAG32nbm2k/tpKCympvvy'},
    {'username': 'dennell', 'password': '$2a$10$jau1W7NmWErYcfzlNR3arufmGxyWiP/DMrZnsqx4NcydZcdyFJ25.'}
]

//initialize passport
app.use(passport.initialize());

passport.use(new BasicStrategy((username, password, callback) => {
    for (var user of users) {
        if (user.username === username || username === "") {
            return bcrypt.compare(password, user.password, function(err, res) {
                if (err) {
                    return callback(err);
                } else if (res == false) {
                    return callback(null, false);
                } else {
                    return callback(null, user);
                }
            });
        }
    }
    return callback(null, false, 'go away! not for you!');
}));

//routes - AKA first endpoint
app.get('/', function(req, res) {
    res.send(`
        <p>This is the index page that everyone is allowed to see!
            <a href="/authorize">Authorization Page</a>
        </p>
    `);
});

//make sure user is authorized
app.get('/authorize', passport.authenticate('basic', {session:false}), (req, res) => {
    res.send(`
        <p>Now we require authentication-you have passed!
            <a href="/">Index Page</a>
        </p>
    `);
});




//listen
app.listen(process.env.PORT || 8080, process.env.IP, () => {
    console.log('Listening on PORT ' + process.env.PORT || 8080);
});

