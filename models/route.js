const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteSchema = new Schema({
    color: {
        type: String,
    },
    grade: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    attempts: {
        type: String,
        required: true,
    },
    sent: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

RouteSchema.virtual("title").get(function () {
    let title = `${this.color} ${this.grade}`
    
    return title;
})

const Route = mongoose.model('Route', RouteSchema);

module.exports = Route;