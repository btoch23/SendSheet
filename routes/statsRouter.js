const express = require('express');
const Boulder = require('../models/boulder');
const Route = require('../models/route');
const { 
    bouldersSent, 
    routesSent, 
    hardestFlashedBoulder, 
    hardestFlashedRoute 
} = require('../utils/statCalculations');

const statsRouter = express.Router();

statsRouter.route('/boulders')
.get(async (req, res) => {
    const boulders = await Boulder.find({});

    let bouldersSentObj = await bouldersSent();
    let bouldersSentArr = Object.entries(bouldersSentObj);

    let hardestBoulder = await hardestFlashedBoulder();

    res.render('boulderStats', { boulders, hardestBoulder, bouldersSentArr })
})

statsRouter.route('/routes')
.get(async (req, res) => {
    const routes = await Route.find({});

    let hardestRoute = await hardestFlashedRoute();

    let routesSentObj = await routesSent();
    let routesSentArr = Object.entries(routesSentObj)
        
    res.render('routeStats', { routes, hardestRoute, routesSentArr})
})

module.exports = statsRouter;