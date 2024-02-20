const express = require('express');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');
const stats = require('../controllers/stats');

const statsRouter = express.Router();

statsRouter.route('/boulders')
.get(isLoggedIn, catchAsync(stats.boulderStatsPage))

statsRouter.route('/routes')
.get(isLoggedIn, catchAsync(stats.routeStatsPage))

module.exports = statsRouter;