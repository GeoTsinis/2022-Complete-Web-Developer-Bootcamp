//One to ALOT relationship
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

const userSchema = new mongoose.Schema({
    username: String,
    age: Number
});

const tweetSchema = new mongoose.Schema({
    text: String,
    likes: Number,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async () => {
//     // const user = new User({username: 'chickefan99', age: 14});
//     const user = await User.findOne({username: 'chickefan99'})
//     const tweet1 = new Tweet({text: 'my chicken hunts me', likes: 115});
//     tweet1.user = user;
//     // user.save();
//     tweet1.save();
// }

// makeTweets();

const findTweet = async () => {
    const t = await Tweet.find({}).populate('user', 'username');
    console.log(t)
}

findTweet();