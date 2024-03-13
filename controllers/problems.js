const Boulder = require('../models/boulder');
const Route = require('../models/route');

module.exports.journal = async (req, res) => {
    const boulders = await Boulder.find({climber: req.user._id});
    const routes = await Route.find({climber: req.user._id});
    const date = new Date().toLocaleDateString('en-US');

    res.render('problems/journal', { boulders, routes, date });
}

module.exports.all = async (req, res) => {
    const boulders = await Boulder.find({climber: req.user._id});
    const routes = await Route.find({climber: req.user._id});

    res.render('problems/all', { boulders, routes });
}

module.exports.newBoulderForm = (req, res) => {
    res.render('problems/newBoulder');
}

module.exports.newRouteForm = (req, res) => {
    res.render('problems/newRoute');
}

module.exports.newProblem = async (req, res) => {
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
}

module.exports.updateProblem = async (req, res) => {
    const { id } = req.params;

    if (req.body.boulder) {
        const boulder = await Boulder.findByIdAndUpdate(id, { ...req.body.boulder });
    } else if (req.body.route) {
        const route = await Route.findByIdAndUpdate(id, { ...req.body.route });
    }
    req.flash('success', 'Successfully updated problem');
    res.redirect('/problems')
}

module.exports.deleteProblem = async (req, res) => {
    const { id } = req.params;

    await Boulder.findByIdAndDelete(id);
    await Route.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted problem');
    res.redirect('/problems')
}

module.exports.editForm = async (req, res) => {
    const { id } = req.params;

    const boulder = await Boulder.findById(id);
    const route = await Route.findById(id);

    if (!boulder && !route) {
        req.flash('error', 'Cannot find that problem');
        res.redirect('/problems');
    }

    if (boulder) {
        res.render('problems/editBoulder', { boulder })
    } else if (route) {
        res.render('problems/editRoute', { route })
    }
}