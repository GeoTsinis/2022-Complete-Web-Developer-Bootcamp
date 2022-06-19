const express = require('express');
const app = express();
const morgan = require('morgan');

//use the morgan middleware for every request 
app.use(morgan('tiny'));

//using middleware to manipulate request information or data
app.use((req, res, next) => {
    req.requestTime = Date.now();
    // console.log(req.method, req.path);
    next();
})

//running a middleware for a specific path no matter the request type
app.use('/dogs', (req, res, next) => {
    console.log("I LOVE DOGS");
    next();
})

//authentication demo checking the query although irl we dont use passwords on querystrings
const verifyPassword = (req, res, next) => {
    // console.log(req.query)
    const {password} = req.query;
    if(password === 'paokara') {
        next();
    }
    res.send('SORRY YOU NEED A PASSWORD')
}

//creating my own middleware with app.use
//NOTE: If I use res.send next will never execute 
// app.use((req, res, next) => {
//     console.log("THIS IS MY FIRST MIDDLEWARE");
//     next()
// })
// app.use((req, res, next) => {
//     console.log("THIS IS MY SECOND MIDDLEWARE");
//     next()
// })



app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send("HOME PAGE")
});

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send("WOOF WOOF")
});

//running a middleware for a specific request 
app.get('/secret', verifyPassword, (req, res) => {
    res.send("I AM A PAOK FAN!!")
});

//making a middleware for a request that does not match with any path
//NOTE: The position of this lines matters for it to run correctly
app.use((req, res) => {
    res.status(404).send('NOT FOUND!');
});

app.listen(3000, () => {
    console.log("App is running on localhost:3000")
});