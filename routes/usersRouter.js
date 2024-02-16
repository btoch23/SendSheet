const express = require('express');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport')

const usersRouter = express.Router();

usersRouter.route('/register')
.get((req, res) => {
    res.render('users/register')
})
.post(catchAsync(async(req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.flash('success', 'Welcome to SendSheet!');
        res.redirect('/problems');  
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}))

usersRouter.route('/login')
.get((req, res) => {
    res.render('users/login')
})
.post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect('/problems');
})

module.exports = usersRouter;
