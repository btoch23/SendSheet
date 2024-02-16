const express = require('express');
const User = require('../models/user');

const usersRouter = express.Router();

usersRouter.route('/register')
.get((req, res) => {
    res.render('users/register')
})
.post(async(req, res) => {
    res.send(req.body);
})

module.exports = usersRouter;
