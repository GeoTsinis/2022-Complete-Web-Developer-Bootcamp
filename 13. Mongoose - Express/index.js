const express = require('express');
const app = express();
const path = require('path');
const Product = require('./models/product');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy'];

mongoose.connect('mongodb://localhost:27017/farmStandApp', {useNewUrlParser: true, useUnifiedTopology: true })
.then( () => {
    console.log("MONGO CONNECTION OPEN!!")
})
.catch( err => {
    console.log("OHH NO MONGO CONNECTION ERROR!");
    console.log(err)
})

app.get('/products', async (req, res) => {
    const {category} = req.query;
    if(category) {
        const products = await Product.find({ category })
        res.render('products/index', {products, category});
    } else {
        const products = await Product.find({})
        res.render('products/index', {products, category: 'All'}); 
    }
})


//make a new product --- rendering the page
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
})

//making a post request and saving to the database
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
})

//find the product by id
app.get('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id)
    res.render('products/details', {product})
})

//get a product by id and edit it 
app.get('/products/:id/edit', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', {product, categories});
})

//send a requset put() or pathch() with method override
app.put('/products/:id', async (req, res) => {
    const {id} = req.params;
    //we don't do validation for now
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/products/${product._id}`);
})

//delete a product with delete() method override
app.delete('/products/:id', async (req, res) => {
    const {id} = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

//browse by categories


app.listen(3000, () => {
    console.log("LISTENING TO PORT 3000...");
})