const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: [true, 'Username cannot be blank']
    },
    password: {
        type: String, 
        required: [true, 'Username cannot be blank']
    }
})

//having a static method to find a user by username and check if password is same
userSchema.statics.findAndValidate = async function(username, password) {
    const foundUser = await this.findOne({ username });
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid? foundUser : false;

}

//creating a middleware on server side that transforms the password to hash before the new user is saved to the database
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); //returns true if password was modified for the model
    this.password = await bcrypt.hash(this.password, 12); //this refers to the saved user
    next();
})

module.exports = mongoose.model('User', userSchema);