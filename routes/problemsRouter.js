const express = require('express');
const Boulder = require('../models/boulder');
const Route = require('../models/route');

const problemsRouter = express.Router();

problemsRouter.route('/')
.get(async (req, res) => {
    const boulders = await Boulder.find({});
    const routes = await Route.find({});
    const date = new Date().toLocaleDateString('en-US');

    res.render('problems/journal', { boulders, routes, date });
})
.post(async (req, res) => {
    if (req.body.boulder) {
        const boulder = new Boulder(req.body.boulder);
        await boulder.save();
    } else if (req.body.route) {
        const route = new Route(req.body.route);
        await route.save();
    }
    res.redirect('/problems');
})

problemsRouter.route('/:id')
.put(async (req, res) => {
    const { id } = req.params;

    if (req.body.boulder) {
        await Boulder.findByIdAndUpdate(id, { ...req.body.boulder });
    } else if (req.body.route) {
        await Route.findByIdAndUpdate(id, { ...req.body.route });
    }
    res.redirect('/problems')
})
.delete(async (req, res) => {
    const { id } = req.params;

    await Boulder.findByIdAndDelete(id);
    await Route.findByIdAndDelete(id);
    res.redirect('/problems')
})

problemsRouter.route('/:id/edit')
.get(async (req, res) => {
    const boulder = await Boulder.findById(req.params.id);
    const route = await Route.findById(req.params.id);

    if (boulder) {
        res.render('problems/editBoulder', { boulder })
    } else if (route) {
        res.render('problems/editRoute', { route })
    }
})

problemsRouter.route('/newBoulder')
.get((req, res) => {
    res.render('problems/newBoulder');
})

problemsRouter.route('/newRoute')
.get((req, res) => {
    res.render('problems/newRoute');
})


module.exports = problemsRouter;