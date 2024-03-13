const express = require('express');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateProblem } = require('../middleware');
const problems = require('../controllers/problems');

const problemsRouter = express.Router();

problemsRouter.route('/')
.get(isLoggedIn, catchAsync(problems.journal))
.post(isLoggedIn, validateProblem, catchAsync(problems.newProblem))

problemsRouter.route('/all')
.get(isLoggedIn, catchAsync(problems.all))

problemsRouter.route('/:id')
.put(isLoggedIn, isAuthor, validateProblem, catchAsync(problems.updateProblem))
.delete(isLoggedIn, isAuthor, catchAsync(problems.deleteProblem))

problemsRouter.route('/:id/edit')
.get(isLoggedIn, isAuthor, catchAsync(problems.editForm))

problemsRouter.route('/newBoulder')
.get(isLoggedIn, problems.newBoulderForm)

problemsRouter.route('/newRoute')
.get(isLoggedIn, problems.newRouteForm)


module.exports = problemsRouter;