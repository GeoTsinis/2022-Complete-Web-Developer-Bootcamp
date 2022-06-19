//One to few relationship
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo', {useNewUrlParser: true, useUnifiedTopology: true })
.then( () => {
    console.log("MONGO CONNECTION OPEN!!")
})
.catch( err => {
    console.log("OHH NO MONGO CONNECTION ERROR!");
    console.log(err)
});

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            city: String,
            state: String,
            country: String,
            street: String,
        }
    ]
})

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first: 'Harry',
        last: 'Potter'
    })
    u.addresses.push({
        city: 'New York',
        street: '123 Susami',
        state: 'NY',
        country: 'USA'
    })
    const res = await u.save();
    console.log(res);
}

const addAddress = async (id) => {
    const user = await User.findById(id);
    user.addAddress.push({
        street: '99 3rd St.',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    })
    const res = await user.save();
    console.log(res);
}

makeUser();
addAddress('626d71177e098c76925cd66c')