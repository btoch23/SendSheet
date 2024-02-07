const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Boulder = require('./models/boulder')
const Route = require('./models/route')
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
    res.render('home')
})

app.get('/stats', async (req, res) => {
    const boulders = await Boulder.find({});
    const routes = await Route.find({});

    res.render('stats', { boulders, routes })
})

app.get('/problems', async (req, res) => {
    const boulders = await Boulder.find({});
    const routes = await Route.find({});
    const date = new Date().toLocaleDateString('en-US');

    res.render('problems/journal', { boulders, routes, date });
})

app.get('/problems/newBoulder', (req, res) => {
    res.render('problems/newBoulder');
})

app.get('/problems/newRoute', (req, res) => {
    res.render('problems/newRoute');
})

app.post('/problems', async (req, res) => {
    if (req.body.boulder) {
        const boulder = new Boulder(req.body.boulder);
        await boulder.save();
    } else if (req.body.route) {
        const route = new Route(req.body.route);
        await route.save();
    }
    res.redirect('/problems');
})

app.get('/problems/:id/edit', async (req, res) => {
    const boulder = await Boulder.findById(req.params.id);
    const route = await Route.findById(req.params.id);

    if (boulder) {
        res.render('problems/editBoulder', { boulder })
    } else if (route) {
        res.render('problems/editRoute', { route })
    }
})

app.put('/problems/:id', async (req, res) => {
    const { id } = req.params;

    if (req.body.boulder) {
        await Boulder.findByIdAndUpdate(id, { ...req.body.boulder });
    } else if (req.body.route) {
        await Route.findByIdAndUpdate(id, { ...req.body.route });
    }
    res.redirect('/problems')
})

app.delete('/problems/:id', async (req, res) => {
    const { id } = req.params;

    await Boulder.findByIdAndDelete(id);
    await Route.findByIdAndDelete(id);
    res.redirect('/problems')
})

app.listen(5000, () => {
    console.log('Serving on port 5000')
})