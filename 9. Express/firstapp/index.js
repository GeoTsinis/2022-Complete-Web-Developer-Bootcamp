const express = require('express');
const app = express();

// app.use((req, res) => {
//     console.log('WE GOT A NEW REQUEST');
//     // res.send('HELLO WE GOT YOUR REQUEST');
//     res.send('<h1> Hello we got your request </h1>')
// });

app.get('/', (req, res) => {
    res.send('HOME PAGE');
});

//when we have a pattern with different params
app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.send(`<h1>Browsing the ${subreddit} subreddit </h1>`)
});

app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(`<h1>Viewing Post ID: ${postId} from ${subreddit} subreddit</h1>`)
})

app.get('/cats', (req, res) => {
    res.send('meow!');
});

app.get('/dogs', (req, res) => {
    res.send('woof!')
});

//queries
app.get('/search', (req, res) => {
    const {q} = req.query;
    if (!q){
        res.send(`NOTHING FOUND FOR NOTHING SEARCHED`);
    }
    res.send(`Search results for ${q}`);
})


//default message for no matching param
app.get('*', (req, res) => {
    res.send(`Path does not exist! :(`)
})


app.listen(8080, () => {
    console.log('LISTENING ON PORT 8080');
});