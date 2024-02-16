const express = require('express');
const Boulder = require('../models/boulder');
const Route = require('../models/route');
const catchAsync = require('../utils/catchAsync');
const { problemSchema } = require('../schemas');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn, validateProblem } = require('../middleware');

const problemsRouter = express.Router();

problemsRouter.route('/')
.get(isLoggedIn, catchAsync(async (req, res) => {
    const boulders = await Boulder.find({});
    const routes = await Route.find({});
    const date = new Date().toLocaleDateString('en-US');

    res.render('problems/journal', { boulders, routes, date });
}))
.post(isLoggedIn, validateProblem, catchAsync(async (req, res) => {
    if (req.body.boulder) {
        const boulder = new Boulder(req.body.boulder);
        await boulder.save();
    } else if (req.body.route) {
        const route = new Route(req.body.route);
        await route.save();
    }
    req.flash('success', 'Successfully logged a new problem')
    res.redirect('/problems');
}))

problemsRouter.route('/:id')
.put(isLoggedIn, validateProblem, catchAsync(async (req, res) => {
    const { id } = req.params;

    if (req.body.boulder) {
        await Boulder.findByIdAndUpdate(id, { ...req.body.boulder });
    } else if (req.body.route) {
        await Route.findByIdAndUpdate(id, { ...req.body.route });
    }
    req.flash('success', 'Successfully updated problem');
    res.redirect('/problems')
}))
.delete(catchAsync(async (req, res) => {
    const { id } = req.params;

    await Boulder.findByIdAndDelete(id);
    await Route.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted problem');
    res.redirect('/problems')
}))

problemsRouter.route('/:id/edit')
.get(isLoggedIn, catchAsync(async (req, res) => {
    const boulder = await Boulder.findById(req.params.id);
    const route = await Route.findById(req.params.id);

    if (!boulder && !route) {
        req.flash('error', 'Cannot find that problem');
        res.redirect('/problems');
    }

    if (boulder) {
        res.render('problems/editBoulder', { boulder })
    } else if (route) {
        res.render('problems/editRoute', { route })
    }
}))

problemsRouter.route('/newBoulder')
.get(isLoggedIn, (req, res) => {
    res.render('problems/newBoulder');
})

problemsRouter.route('/newRoute')
.get(isLoggedIn, (req, res) => {
    res.render('problems/newRoute');
})


module.exports = problemsRouter;