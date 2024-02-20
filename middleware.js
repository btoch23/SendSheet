const Boulder = require('./models/boulder');
const Route = require('./models/route');
const { problemSchema } = require('./schemas');
const ExpressError = require('./utils/ExpressError');

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!')
        return res.redirect('/login');
    }
    next();
}

module.exports.validateProblem = (req, res, next) => {
    const { error } = problemSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    
    const boulder = await Boulder.findById(id);
    const route = await Route.findById(id);

    if (boulder) {
        if (!boulder.climber.equals(req.user._id)) {
            req.flash('error', 'You do not have permission to do that!');
            return res.redirect('/problems');
        }
        next();
    } else if (route) {
        if (!route.climber.equals(req.user._id)) {
            req.flash('error', 'You do not have permission to do that!');
            return res.redirect('/problems');
        }
        next();
    }
}