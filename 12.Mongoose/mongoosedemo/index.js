const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true })
.then( () => {
    console.log("CONNECTION OPEN!!")
})
.catch( err => {
    console.log("OHH NO ERROR!");
    console.log(err)
})

//first step is creating a scema for the js side
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
})

//creates a collection of called movies on mongo creating a movie obj
const Movie = mongoose.model('Movie', movieSchema);

//this just creates an instance of a movie it doesn't add it to the db
//to add I have to use the save method (amadeus.save())
// const amadeus = new Movie({title: 'Amadeus', year: 1986, score: 9.2, rating: 'R'});

// //how to insert many (not common) returns a promise
// Movie.insertMany([
//     {title: 'Amelie', year: 2001, score: 8.3, rating: 'R'},
//     {title: 'Alien', year: 1979, score: 8.1, rating: 'R'},
//     {title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG'},
//     {title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R'},
//     {title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13'}
// ])
//     .then(data => {
//         console.log("IT WORKED")
//         console.log(data)
//     })