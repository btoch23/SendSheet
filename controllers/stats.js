const { 
    bouldersSent, 
    routesSent, 
    hardestFlashedBoulder, 
    hardestFlashedRoute 
} = require('../utils/statCalculations');

module.exports.boulderStatsPage = async (req, res) => {
    let bouldersSentObj = await bouldersSent(req.user._id);
    let bouldersSentArr = Object.entries(bouldersSentObj);

    let hardestBoulder = await hardestFlashedBoulder(req.user._id);

    res.render('problems/boulderStats', { hardestBoulder, bouldersSentArr })
}

module.exports.routeStatsPage = async (req, res) => {
    let routesSentObj = await routesSent(req.user._id);
    let routesSentArr = Object.entries(routesSentObj);

    let hardestRoute = await hardestFlashedRoute(req.user._id);
        
    res.render('problems/routeStats', { hardestRoute, routesSentArr})
}