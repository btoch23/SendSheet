const express = require('express');
const Boulder = require('../models/boulder');
const Route = require('../models/route');
const catchAsync = require('../utils/catchAsync');
const { problemSchema } = require('../schemas');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn } = require('../middleware');

const problemsRouter = express.Router();

const validateProblem = (req, res, next) => {
    const { error } = problemSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

problemsRouter.route('/')
.get(isLoggedIn, catchAsync(async (req, res) => {
    const boulders = await Boulder.find({climber: req.user._id});
    const routes = await Route.find({climber: req.user._id});
    const date = new Date().toLocaleDateString('en-US');

    res.render('problems/journal', { boulders, routes, date });
}))
.post(isLoggedIn, validateProblem, catchAsync(async (req, res) => {
    if (req.body.boulder) {
        const boulder = new Boulder(req.body.boulder);
        boulder.climber = req.user._id;
        await boulder.save();
    } else if (req.body.route) {
        const route = new Route(req.body.route);
        route.climber = req.user._id;
        await route.save();
    }
    req.flash('success', 'Successfully logged a new problem')
    res.redirect('/problems');
}))

problemsRouter.route('/:id')
.put(isLoggedIn, validateProblem, catchAsync(async (req, res) => {
    const { id } = req.params;
    if (req.body.boulder) {
        const boulder = await Boulder.findById(id);
        if (!boulder.climber.equals(req.user._id)) {
            req.flash('error', 'You do not have permission to do that!');
            return res.redirect('/problems');
        }
        const b = await Boulder.findByIdAndUpdate(id, { ...req.body.boulder });
    } else if (req.body.route) {
        const route = await Route.findById(id);
        if (!route.climber.equals(req.user._id)) {
            req.flash('error', 'You do not have permission to do that!');
            return res.redirect('/problems');
        }
        const r = await Route.findByIdAndUpdate(id, { ...req.body.route });
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