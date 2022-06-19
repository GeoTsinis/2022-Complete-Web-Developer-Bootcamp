const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');

mongoose.connect('mongodb://localhost:27017/authDemo', {useNewUrlParser: true, useUnifiedTopology: true })
.then( () => {
    console.log("MONGO CONNECTION OPEN!!")
})
.catch( err => {
    console.log("OHH NO MONGO CONNECTION ERROR!");
    console.log(err)
})

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true}));
app.use(session({secret: 'notagoodsecret'}))

//middleware to check if user is logged in
const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }
    next();
}

app.get('/', (req, res) => {
    res.send('THIS IS THE HOME PAGE')
})

app.get('/register', (req, res) => {
    res.render('register')
})

//saving a new user with a hashed pwd to the database
app.post('/register', async (req, res) => {
    const {password, username} = req.body;
    // const hash = await bcrypt.hash(password, 12); WE CAN DO IT INSIDE THE USER SCHEMA
    const user = new User({
        username,
        // password: hash
        password
    })
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/')
})

//to log out we just set the user_id that is stored to the session cookie to null, or we can use req.session.destroy() witch destoys everything that is stored 
app.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/login');
})

app.get('/secret', requireLogin, (req, res) => {
    res.render('secret') 
})

app.get('/topsecret', requireLogin, (req, res) => {
    res.send("TOP SECRET")
})

app.get('/login', (req, res) => {
    res.render('login');
})

//TIP: it's always a better idea to check if the username exists or if the pass is valid BUT if one of them is wrong it's better not to hint witch one was false
app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    // const user = await User.findOne({ username });
    // const validPassword = await bcrypt.compare(password, user.password);
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        req.session.user_id = foundUser._id; //creating a session to remember the logged in user, saving the id in a cookie
        res.redirect('/secret');
    } else {
        res.redirect('/login')
    }
})

app.listen(3000, () => {
    console.log("SERVING PORT 3000")
})