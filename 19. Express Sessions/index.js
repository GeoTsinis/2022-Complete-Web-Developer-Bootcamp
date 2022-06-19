const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
    secret: 'thisisnotagoodsecret',
    resave: false,
    saveUninitialized: false
}));

//every time we have a request we will have a session property
//it gives my session an id so that the browser can remember it
//if I use the same browser it will have the same id so the 
//req.session count will be count += 1
//data are stored in the server side so it resets if the session ends
app.get('/viewcount', (req, res) => {
    if (req.session.count) {
        req.session.count += 1;
    } else {
        req.session.count = 1; 
    }

    res.send(`YOU HAVE VIEWED THIS PAGE ${req.session.count} TIMES.`);
})

app.get('/register', (req, res) => {
    const {username = 'Anonymous'} = req.query;
    req.session.username = username;
    res.redirect('/greet');
})

app.get('/greet', (req, res) => {
    const {username} = req.session;
    res.send(`Welcome back ${username}`);
})

app.listen(3000, () => {
    console.log("Listening to port 3000");
})