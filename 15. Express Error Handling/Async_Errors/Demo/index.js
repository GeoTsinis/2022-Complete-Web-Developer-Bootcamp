//This is a copy from lesson 13: Mongoose with Express with Async Error Handling
//Possible Errors: id not matching, content not validated etc.

const express = require('express');
const app = express();
const path = require('path');
const Product = require('./models/product');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const AppError = require('./AppError');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy'];

mongoose.connect('mongodb://localhost:27017/farmStand2', {useNewUrlParser: true, useUnifiedTopology: true })
.then( () => {
    console.log("MONGO CONNECTION OPEN!!")
})
.catch( err => {
    console.log("OHH NO MONGO CONNECTION ERROR!");
    console.log(err)
})

app.get('/products', async (req, res, next) => {
    try {
        const {category} = req.query;
    if(category) {
        const products = await Product.find({ category })
        res.render('products/index', {products, category});
    } else {
        const products = await Product.find({})
        res.render('products/index', {products, category: 'All'}); 
    }
    } catch (error) {
        next(error);
    }
})

//We can make a wrap function to wrap every async function in order to avoid writing try catch in every single one of them
//It just takes a func as param and adds a catch that calls next(err)
function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req,res, next).catch(err => next(err))
    }
}

//make a new product --- rendering the page
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
})

//making a post request and saving to the database
//possible error: Data Validation by Mongoose
app.post('/products', wrapAsync(async (req, res, next) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
}))

//find the product by id
//possible error id does not exist
app.get('/products/:id', wrapAsync(async (req, res, next) => {
        const {id} = req.params;
        const product = await Product.findById(id)
        if(!product) {
        //   return next(new AppError('Product Not Found', 404)); // I have to call the next method to call the error handler 
            throw new AppError('Product Not Found', 404)
        }
        res.render('products/details', {product})  
}))

//get a product by id and edit it 
app.get('/products/:id/edit', async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if(!product) {
            throw new AppError('Product Not Found', 404); // I have to call the next method to call the error handler 
        }
        res.render('products/edit', {product, categories});
    } catch (error) {
        next(error);
    }
})

//send a requset put() or pathch() with method override
app.put('/products/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
        res.redirect(`/products/${product._id}`);
    } catch (error) {
        next(error);
    }
})

//delete a product with delete() method override
app.delete('/products/:id', async (req, res) => {
    const {id} = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

//creating a handler for mongoose Errors (such as validation error)
const handleValidationErr = err => {
    console.dir(err);
    return new AppError(`Validation failed... ${err.message}`, 400);
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if(err.name === 'ValidationError') err = handleValidationErr(err)
    next(err);
})

app.use((err, req, res, next) => {
    const {status = 500, message = 'Something Went Wrong'} = err;
    res.status(status).send(message);   // IRL you have to redirect somewhere
})

app.listen(3000, () => {
    console.log("LISTENING TO PORT 3000...");
})