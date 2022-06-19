//This is a copy file from lesson 14 with modifications for error handling

const express = require('express');
const app = express();
const morgan = require('morgan');

const AppError = require('./AppError');

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

    // res.send('SORRY YOU NEED A PASSWORD')

    //throwing a costume error
    // res.status(401);
    // throw new Error('Password required');

    //making an Error Class instead of writing res.status all the time
    throw new AppError('password required', 401);
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

app.get('/error', (req, res) => {
    chicken.fly()
})

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send("WOOF WOOF")
});



// //running a middleware for a specific request 
app.get('/secret', verifyPassword, (req, res) => {
    res.send("I AM A PAOK FAN!!")
});

//403: we know the user but he doesn't have permissions
app.get('/admin', (req, res) => {
    throw new AppError('You are not an admin', 403);
})

//making a middleware for a request that does not match with any path
//NOTE: The position of this lines matters for it to run correctly
app.use((req, res) => {
    res.status(404).send('NOT FOUND!');
});

//error handling middleware NOTE: it needs a parameter err at the start
//NOTE 2: it has to be the last app.use
// app.use((err, req, res, next) => {
//     console.log("*************ERROR****************")
//     // res.status(500).send("OHH BOY WE GOT AN ERROR")
    
//     //NOTE 3: If I call next with no params we look for the next middleware that is not defined
//     //we have to call next with param error to get the next error handler
//     console.log(err);
//     next(err);
// });

app.use((err, req, res, next) => {
    const {status = 500, message = 'Something Went Wrong'} = err; //I give a default status if status is undifined
    res.status(status).send(message)
})

app.listen(3000, () => {
    console.log("App is running on localhost:3000")
});
