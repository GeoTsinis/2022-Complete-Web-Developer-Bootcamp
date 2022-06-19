const express = require('express');
const app = express();
const path = require('path');
const {v4: uuid} = require('uuid');
const methodOverride = require('method-override');


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')))

app.get('/', (req, res) => {
    res.render('home');
});

let bookings = [
    {
        roomId: uuid(),
        clientName: 'Bob Dylan',
        numOfGuests: 4,
        notes: 'Nice view, clean bathroom and warm.'
    },
    {
        roomId: uuid(),
        clientName: 'Elene Paparizou',
        numOfGuests: 2,
        notes: 'Big and cozy bed.'
    },
    {
        roomId: uuid(),
        clientName: 'Hank',
        numOfGuests: 2,
        notes: 'Not enough drinks in the fridge!'
    },
    {
        roomId: uuid(),
        clientName: 'Ash',
        numOfGuests: 7,
        notes: 'My pokemons had a great time by the pool.'
    }

]

app.get('/bookings', (req, res) => {
    res.render('bookings/index', { bookings})
});

app.get('/bookings/new', (req,res) => {
    res.render('bookings/new')
});

app.post('/bookings', (req,res) => {
    const {clientName, numOfGuests, clientNote} = req.body;
    bookings.push({clientName, numOfGuests,notes: clientNote, roomId: uuid()})
    res.redirect('/bookings')
})

app.get('/bookings/:id', (req, res) => {
    const {id} = req.params;
    const booking = bookings.find(b => b.roomId === id);
    res.render('bookings/show', { booking });
})

app.patch('/bookings/:id', (req, res) => {
    const {id} = req.params;
    const newBookingNotes = req.body.note;
    const newGuests = req.body.numOfGuests;
    const foundBook = bookings.find(b => b.roomId === id);
    foundBook.numOfGuests = newGuests;
    foundBook.notes = newBookingNotes;
    res.redirect('/bookings');
})

app.get('/bookings/:id/edit', (req, res) => {
    const {id} = req.params;
    const booking = bookings.find(b => b.roomId === id);
    res.render('bookings/edit', {booking});
})

app.delete('/bookings/:id', (req, res) => {
    const {id} = req.params;
    bookings = bookings.filter(b => b.roomId !== id);
    res.redirect('/bookings');
})

app.listen(3000, () => {
    console.log("Listening to port 3000...")
});