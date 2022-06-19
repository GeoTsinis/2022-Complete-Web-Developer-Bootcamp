const express = require('express');
const app = express();
const path = require('path');
//creating a unique id with uuid npm
const {v4: uuidv4} = require('uuid')
//npm from express to do a different verb (because html form support only get and post requests)
const methodOverride = require('method-override')

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'))


//example plan
/*
NAME   PATH               VERB    PURPOSE
Index  /comments           GET     Display all comments
New    /comments/new       GET     Form to create a new comment
Create /comments           POST    Create a new comment on server
Show   /comments/:id       GET     Details for one specific comment
Edit   /comments/:id/edit  GET     Form to edit specific comment
Update /comments/:id       PATCH   Updates specific comment on server
Destroy /comments/:id      DELETE  Deletes specific item on server
*/

let comments = [
    {   
        id: uuidv4(), 
        username: 'Rodd',
        comment: 'Lolol'
    },
    {   
        id: uuidv4(),
        username: 'John',
        comment: 'LolSo fol'
    },
    {   
        id: uuidv4(),
        username: 'Tex',
        comment: 'NO WAY DUDE'
    }
];

//read comments
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

//render a form for creating new comments
app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

//send the data to database/server
app.post('/comments', (req, res) => {
    const {username, comment} = req.body;
    comments.push({ username, comment , id: uuidv4() })
    //redirect to the comments index
    res.redirect('/comments');
})

//get a specific comment based on an id
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', { comment })
})

//update a comment
app.patch('/comments/:id', (req, res) => {
    const {id} = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find( c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
})

//get the path for the edit comment
app.get('/comments/:id/edit', (req, res) => {
    const {id} = req.params;
    const comment = comments.find( c => c.id === id);
    res.render('comments/edit', { comment })
})

//delete a comment based on the id
app.delete('/comments/:id', (req, res) => {
    const {id} = req.params;
    comments = comments.filter( c => c.id !== id);
    res.redirect('/comments');
})

// app.get('/tacos', (req, res) => {
//     res.send("GET /tacos response");
// })

// app.post('/tacos', (req, res) => {
//     const {meat, qty} = req.body;
//     res.send(`OK, here is your ${qty} ${meat} tacos.`);
// })

app.listen(3000, () => {
    console.log("Listening to port 3000...")
})