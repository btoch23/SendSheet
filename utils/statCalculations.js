const Boulder = require('../models/boulder')
const Route = require('../models/route')

module.exports.bouldersSent = async (user) => {
    //define an object containing difficulty keys with array values that contain number of sent boulders, flashed boulders, and flash percentage
    const totalSends = {
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
    const sentBoulders = await Boulder.find({ sent: true, climber: user });
    //loop over sent boulders and record number per grade
    for (let boulder of sentBoulders) {
        let grade = boulder.grade;
        totalSends[grade][0] += 1;
    };
    //grab all flashed boulders
    const flashedBoulders = await Boulder.find({ attempts: {$in: ['Flashed', 'Onsighted']}, climber: user });
    //loop over flashed boulders and record number per grade and percentage of routes flashed to sent per grade
    for (let boulder of flashedBoulders) {
        let grade = boulder.grade;
        totalSends[grade][1] += 1;
        totalSends[grade][2] = Math.floor((totalSends[grade][1] / totalSends[grade][0]) * 100)
    }
    //return the object
    return totalSends;
};

module.exports.routesSent = async (user) => {
    //define an object containing difficulty keys with array values that contain number of sent routes, flashed routes, and flash percentage
    const totalSends = {
        "5.6": [0, 0, 0],
        "5.7": [0, 0, 0],
        "5.8": [0, 0, 0],
        "5.9": [0, 0, 0],
        "5.10-": [0, 0, 0],
        "5.10": [0, 0, 0],
        "5.10+": [0, 0, 0],
        "5.11-": [0, 0, 0],
        "5.11": [0, 0, 0],
        "5.11+": [0, 0, 0],
        "5.12-": [0, 0, 0],
        "5.12": [0, 0, 0],
        "5.12+": [0, 0, 0],
        "5.13-": [0, 0, 0],
        "5.13": [0, 0, 0],
        "5.13+": [0, 0, 0],
    }
    //grab all routes that have been sent
    const sentRoutes = await Route.find({ sent: true, climber: user });
    //loop over sent routes and record number per grade
    for (let route of sentRoutes) {
        let grade = route.grade;
        totalSends[grade][0] += 1;
    };
    //grab all flashed routes
    const flashedRoutes = await Route.find({ attempts: {$in: ['Flashed', 'Onsighted']}, climber: user });
    //loop over flashed routes and record number per grade and percentage of routes flashed to sent per grade
    for (let route of flashedRoutes) {
        let grade = route.grade;
        totalSends[grade][1] += 1;
        totalSends[grade][2] = Math.floor((totalSends[grade][1] / totalSends[grade][0]) * 100)
    }
    //return the object
    return totalSends;
};

module.exports.hardestFlashedBoulder = async (user) => {
    const boulders = await Boulder.find({climber: user, sent: true});

    let hardestBoulder = await Boulder.findOne({ attempts: {$in: ['Flashed', 'Onsighted']}, climber: user });

    if (boulders) {
        for (let boulder of boulders) {
            if (boulder.attempts === 'Flashed' || boulder.attempts === 'Onsighted') {
                let grade = Number(boulder.grade.slice(1));
                let highestGrade = 0;
                if (hardestBoulder) {
                    highestGrade = Number(hardestBoulder.grade.slice(1));
                }
                
                if (grade > highestGrade) {
                    hardestBoulder = boulder;
                }
            }
        }
    }

    return hardestBoulder;
};

module.exports.hardestFlashedRoute = async (user) => {
    const routes = await Route.find({climber: user, sent: true});

    let hardestRoute = await Route.findOne({ attempts: {$in: ['Flashed', 'Onsighted']}, climber: user });

    if (routes) {
        for (let route of routes) {
            if (route.attempts === 'Flashed' || route.attempts === 'Onsighted') {
                let grade = route.grade.slice(2);

                if (!Number(grade)) {
                    grade = Number(grade.slice(0, 2));
                } else {
                    grade = Number(grade);
                }

                let highestGrade = 0;

                if (hardestRoute) {
                    highestGrade = hardestRoute.grade.slice(2);
                    if (!Number(highestGrade)) {
                        highestGrade = Number(highestGrade.slice(0, 2));
                    } else {
                        highestGrade = Number(highestGrade);
                    }
                }
                
                if (grade > highestGrade) {
                    hardestRoute = route;
                }
            }
        }
    }

    return hardestRoute;
}