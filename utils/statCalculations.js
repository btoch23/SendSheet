const Boulder = require('../models/boulder')
const Route = require('../models/route')

module.exports.bouldersSent = async () => {
    //define an object containing difficulty keys with array values that contain number of sent boulders, flashed boulders, and flash percentage
    const totalSends = {
        VB: [0, 0, 0],
        V0: [0, 0, 0],
        V1: [0, 0, 0],
        V2: [0, 0, 0],
        V3: [0, 0, 0],
        V4: [0, 0, 0],
        V5: [0, 0, 0],
        V6: [0, 0, 0],
        V7: [0, 0, 0],
        V8: [0, 0, 0],
        V9: [0, 0, 0],
    }
    //grab all boulders that have been sent
    const sentBoulders = await Boulder.find({ sent: true });
    //loop over sent boulders and record number per grade
    for (let boulder of sentBoulders) {
        let grade = boulder.grade;
        totalSends[grade][0] += 1;
    };
    //grab all flashed boulders
    const flashedBoulders = await Boulder.find({ attempts: {$in: ['Flashed', 'Onsighted']} });
    //loop over flashed boulders and record number per grade and percentage of routes flashed to sent per grade
    for (let boulder of flashedBoulders) {
        let grade = boulder.grade;
        totalSends[grade][1] += 1;
        totalSends[grade][2] = Math.floor((totalSends[grade][1] / totalSends[grade][0]) * 100)
    }
    //return the object
    return totalSends;
};

module.exports.routesSent = async () => {
    //define an object containing difficulty keys with array values that contain number of sent routes, flashed routes, and flash percentage
    const totalSends = {
        "5.6": [0, 0, 0],
        "5.7": [0, 0, 0],
        "5.8": [0, 0, 0],
        "5.9": [0, 0, 0],
        "5.10a": [0, 0, 0],
        "5.10b": [0, 0, 0],
        "5.10c": [0, 0, 0],
        "5.10d": [0, 0, 0],
        "5.11a": [1, 0, 0],
        "5.11b": [0, 0, 0],
        "5.11c": [0, 0, 0],
        "5.11d": [0, 0, 0],
        "5.12a": [0, 0, 0],
        "5.12b": [0, 0, 0],
        "5.12c": [0, 0, 0],
        "5.12d": [0, 0, 0],
        "5.13a": [0, 0, 0],
        "5.13b": [0, 0, 0],
        "5.13c": [0, 0, 0],
        "5.13d": [0, 0, 0],
    }
    //grab all routes that have been sent
    const sentRoutes = await Route.find({ sent: true });
    //loop over sent routes and record number per grade
    for (let route of sentRoutes) {
        let grade = route.grade;
        totalSends[grade][0] += 1;
    };
    //grab all flashed routes
    const flashedRoutes = await Route.find({ attempts: {$in: ['Flashed', 'Onsighted']} });
    //loop over flashed routes and record number per grade and percentage of routes flashed to sent per grade
    for (let route of flashedRoutes) {
        let grade = route.grade;
        totalSends[grade][1] += 1;
        totalSends[grade][2] = Math.floor((totalSends[grade][1] / totalSends[grade][0]) * 100)
    }
    //return the object
    return totalSends;
};