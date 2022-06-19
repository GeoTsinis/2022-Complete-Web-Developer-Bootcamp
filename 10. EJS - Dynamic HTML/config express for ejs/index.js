const express = require('express');
const app = express();
const redditData = require('./data.json');


app.use(express.static(path.join(__dirname, 'public')))
//I can separate these in different directories (js, css,)

app.set('view engine', 'ejs');

//if I want to change the default directory

// const path = require('path');
// app.set('views, path.join(__dirname, '/views'))

//I dont need to add .ejs or the views dir path because the default is {cwd}/views
app.get('/', (req, res) => {
    res.render('home');
});

//We add the parameters in a const subreddit and we render it for the ejs file
app.get('/r/:subreddit', (req, res) => {
    const {subreddit} = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', {...data});
    } else {
        res.render('notfound', {subreddit});
    }
});

app.get('/cats', (req, res) => {
    const cats = ['Blue', 'Rocket', 'Monty', 'Stephanie'];
    res.render('cats', {cats})
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;

    res.render('random', {rand: num})
});

app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000');
});