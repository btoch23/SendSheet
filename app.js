const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Problem = require('./models/problem');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/sendSheet');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.get('/', async (req, res) => {
    const problems = await Problem.find({});
    
    const date = new Date().toLocaleDateString('en-US');

    res.render('home', { problems, date })
})

app.get('/problems', async (req, res) => {
    const problems = await Problem.find({});
    const date = new Date().toLocaleDateString('en-US');

    res.render('problems/journal', { problems, date });
})

app.get('/problems/new', (req, res) => {
    res.render('problems/new');
})

app.listen(5000, () => {
    console.log('Serving on port 5000')
})