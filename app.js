const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError');

mongoose.connect('mongodb://localhost:27017/sendSheet');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const app = express();

const statsRouter = require('./routes/statsRouter');
const problemsRouter = require('./routes/problemsRouter');

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.use('/stats', statsRouter);
app.use('/problems', problemsRouter);

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh no, something went wrong!'
    res.status(statusCode).render('error', { err })
})

app.listen(5000, () => {
    console.log('Serving on port 5000')
})