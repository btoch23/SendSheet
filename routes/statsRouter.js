const express = require('express');
const Boulder = require('../models/boulder');
const Route = require('../models/route');
const { 
    bouldersSent, 
    routesSent, 
    hardestFlashedBoulder, 
    hardestFlashedRoute 
} = require('../utils/statCalculations');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');

const statsRouter = express.Router();

statsRouter.route('/boulders')
.get(isLoggedIn, catchAsync(async (req, res) => {
    let bouldersSentObj = await bouldersSent(req.user._id);
    let bouldersSentArr = Object.entries(bouldersSentObj);

    let hardestBoulder = await hardestFlashedBoulder(req.user._id);

    res.render('problems/boulderStats', { hardestBoulder, bouldersSentArr })
}))

statsRouter.route('/routes')
.get(isLoggedIn, catchAsync(async (req, res) => {
    let routesSentObj = await routesSent(req.user._id);
    let routesSentArr = Object.entries(routesSentObj);

    let hardestRoute = await hardestFlashedRoute(req.user._id);
        
    res.render('problems/routeStats', { hardestRoute, routesSentArr})
}))

module.exports = statsRouter;