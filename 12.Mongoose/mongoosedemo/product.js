const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true })
.then( () => {
    console.log("CONNECTION OPEN!!")
})
.catch( err => {
    console.log("OHH NO ERROR!");
    console.log(err)
})

//DATA VALIDATION required means it has to be there, and if we add something like color it does not add it to database

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive!']
    },
    onSale: {
        type: Boolean,
        //add a default value for onSale
        default: false
    },

    //add an array of data (['cycling','safety'])
    categories: {
        type: [String]
    },
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S','M','L']
    }
});

//adding methods to our instances of type product
productSchema.methods.greet = function () {
    console.log(`HELLO from ${this.name}`)
}

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}

//adding static methods to a schema (mostly for removals and updates or costume finds)
productSchema.statics.fireSale = function () {
    return this.updateMany({}, {onSale: true, price: 0})
}

const Product = mongoose.model('Product', productSchema);



const findProduct = async () => {
   const foundProduct = await Product.findOne({ name: 'Bike helmet'});
   console.log(foundProduct)
   //await because .save() takes time
   await foundProduct.toggleOnSale();
   console.log(foundProduct)
   await foundProduct.addCategory('Gear');
   console.log(foundProduct)
}

Product.fireSale().then(res => console.log(res));

// findProduct();

// const bike = new Product({ name: 'Shoulder Gear', price: 20, categories: ['Cycling']})
// bike.save()
// //Updating does not run validations unless in do runValidations: true
// // Product.findOneAndUpdate({name: 'Tire Pump '}, {price: -10.99}, {new: true, runValidators: true})
//     .then( data => {
//         console.log("IT WORKED");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("OH NO ERROR");
//         console.log(err);
//     })