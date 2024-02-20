const express = require('express');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport')
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.route('/register')
.get(users.registerForm)
.post(catchAsync(users.register))

usersRouter.route('/login')
.get(users.loginForm)
.post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

usersRouter.route('/logout')
.get(users.logout)

module.exports = usersRouter;
