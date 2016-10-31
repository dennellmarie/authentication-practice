//require("")
var express = require("express");
var app = express();

//routes - AKA first endpoint
app.get('/', function(req, res) {
    res.send(`
        <p>This is the index page that everyone is allowed to see!
            <a href="/authorize">Authorization Page</a>
        </p>
    `);
});

app.get('/authorize', function(req, res) {
    res.send(`
        <p>This is the authorization page that doesn't require authorization yet!
            <a href="/">Index Page</a>
        </p>
    `);
});

//listen
app.listen(process.env.PORT || 8080, process.env.IP, () => {
    console.log('Listening on PORT ' + process.env.PORT || 8080);
});


 