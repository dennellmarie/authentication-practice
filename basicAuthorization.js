//require("")
var express = require("express");
var app = express();
//use passport to authorize users
var passport = require("passport");
var BasicStrategy = require('passport-http').BasicStrategy;

//create users
var users = [
    {'username': 'emily', 'password': 'password'},
    {'username': 'dennell', 'password': 'abcd'}
]

//initialize passport
app.use(passport.initialize());

passport.use(new BasicStrategy((username, password, callback) => {
    for (var user of users) {
        if (user.username === username || username === "") {
            if (user.password === password && user.username !== '') {
                return callback(null, user);
            }
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

