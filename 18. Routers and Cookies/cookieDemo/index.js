const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const { send } = require('express/lib/response');
app.use(cookieParser('thisismysecret')); //param adds something to sign our cookies
//signing cookies means that we check if their content are not changed 

app.get('/greet', (req, res) => {
    //getting data from a cookie
    const { name = 'No name'} = req.cookies;
    res.send(`HEY THERE ${name} !!`);
})

app.get('/setname', (req, res) => {
    //sending a cookie
    res.cookie('name', 'stevie chicks');
    res.cookie('animal', 'harlequin shrimp')
    res.send("OK Sending you a cookie")
})

app.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'grape', {signed: true})
    res.send("Signing your cookie")
})

app.get('/verifyfruit', (req, res) => {
    // res.send(req.cookies); //this does not show fruit cookie because as we see on the express docs we have to see the signed cookies 
    res.send(req.signedCookies);
    //if someone screwed with the cookie value it will be set to value: false
})

app.listen(3000, () => {
    console.log("SERVING PORT 3000")
})