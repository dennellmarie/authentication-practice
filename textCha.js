//require("")
var express = require("express");
var app = express();
var bodyParser = require('body-parser');

//use bcrypt to encrypt pw
var bcrypt = require('bcryptjs');

//create users
var users = [
    {'username': 'emily', 'password': '$2a$10$vwjoA/2HmEqE8ocax.7jk.zbFAwUZ158EAG32nbm2k/tpKCympvvy'},
    {'username': 'dennell', 'password': '$2a$10$jau1W7NmWErYcfzlNR3arufmGxyWiP/DMrZnsqx4NcydZcdyFJ25.'}
]

var questions = ["What's your favorite color?", "What's your mom's name?", "What city were you born in?", "What's the name of your first pet?"]

//initialize bodyParser
app.use(bodyParser.urlencoded({extended: false}));



//verify password function using bcrypt
function verifyPW(username, pw, callback) {
    var user = users.find(user => user.username === username);
    bcrypt.compare(pw, user.password, (err, match) => {
        if (err) {
            return callback(err);
        }else if (match && user) {
            return callback(null, user);
        } else {
            return callback(null, false, 'sorry, incorrect username or password');
        }
    });
}

//routes - AKA first endpoint
app.get('/', function(req, res) {
    console.log("app get / ");
    res.send(`
        <p>This is the index page that everyone is allowed to see!
            <a href="/authorize">Authorization Page</a>
        </p>
    `);
});

var getQuestion = function() {
    return questions[Math.floor(Math.random() * questions.length)];
}

//make sure user is authorized
app.get('/authorize', (req, res) => {
    var question = getQuestion();
    console.log('app.get.authorize');
    res.send(`
        <form method="POST">
          Username:<br>
          <input type="text" name="username"><br>
          User password:<br>
          <input type="password" name="password"><br>
          Question:<br>${question}
          <input type="text" name="answer"><br>
          <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/authorize', function(req, res) {
    console.log("At Post");
    verifyPW(req.body.username, req.body.password, (err, match) => {
        if (err) {
            return res.status(500).send("server error");
        }
        if (!match) {
            return res.redirect('/authorize');
        }
        if (match) {
            res.send("haha joke's on you. nothing to see here!");
        }
    });
});


//listen
app.listen(process.env.PORT || 8080, process.env.IP, () => {
    console.log('Listening on PORT ' + process.env.PORT || 8080);
});

