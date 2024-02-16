const express = require('express');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport')
const { storeReturnTo } = require('../middleware');

const usersRouter = express.Router();

usersRouter.route('/register')
.get((req, res) => {
    res.render('users/register')
})
.post(catchAsync(async(req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to SendSheet!');
            res.redirect('/problems');  
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}))

usersRouter.route('/login')
.get((req, res) => {
    res.render('users/login')
})
.post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/problems';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

usersRouter.route('/logout')
.get((req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'See you again soon!')
        res.redirect('/');
    });
})

module.exports = usersRouter;
