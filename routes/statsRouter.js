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
    const boulders = await Boulder.find({});

    let bouldersSentObj = await bouldersSent();
    let bouldersSentArr = Object.entries(bouldersSentObj);

    let hardestBoulder = await hardestFlashedBoulder();

    res.render('problems/boulderStats', { boulders, hardestBoulder, bouldersSentArr })
}))

statsRouter.route('/routes')
.get(isLoggedIn, catchAsync(async (req, res) => {
    const routes = await Route.find({});

    let hardestRoute = await hardestFlashedRoute();

    let routesSentObj = await routesSent();
    let routesSentArr = Object.entries(routesSentObj)
        
    res.render('problems/routeStats', { routes, hardestRoute, routesSentArr})
}))

module.exports = statsRouter;