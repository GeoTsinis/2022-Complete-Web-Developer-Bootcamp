//One to many relationship
const mongoose = require('mongoose');
const {Schema} = mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDemo', {useNewUrlParser: true, useUnifiedTopology: true })
.then( () => {
    console.log("MONGO CONNECTION OPEN!!")
})
.catch( err => {
    console.log("OHH NO MONGO CONNECTION ERROR!");
    console.log(err)
});

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});

const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    products: [
        {type: Schema.Types.ObjectId, ref: 'Product'}
    ]
});

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
//     {name: 'Goddess Melon', price: 4.99, season: 'Summer' },
//     {name: 'Sugar Baby Watermelon', price: 3.99, season: 'Summer' },
//     {name: 'Asparagous', price: 4.99, season: 'Spring' },
// ])

// const makeFarm = async () => {
     
//     const farm = new Farm({name: 'Full Belly Farm', city: 'Guidna, CA'});
//     const melon = await Product.findOne({name: 'Goddess Melon'});
//     farm.products.push(melon);
//     await farm.save();
//     console.log(farm);
// }



// const addProduct = async () => {
//     const farm = await Farm.findOne({name: 'Full Belly Farm'});
//     const watermelon = await Product.findOne({name: 'Sugar Baby Watermelon'})
//     farm.products.push(watermelon);
//     await farm.save();
//     console.log(farm);
// }

// makeFarm();
// addProduct();

//********************NOTE  +++++++++++++++++++*/
//---------- Mongoose populate------------------/

Farm.findOne({name: 'Full Belly Farm'})
    .populate('products') //to get the data from the different collection : NOTE! you have to have the ref on the Schema
    .then(farm => console.log(farm));