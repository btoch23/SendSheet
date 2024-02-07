const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoulderSchema = new Schema({
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
        type: String,
        default: new Date().toLocaleDateString('en-US'),
    }
});

BoulderSchema.virtual("title").get(function () {
    let title = `${this.color} ${this.grade}`
    
    return title;
})

const Boulder = mongoose.model('Boulder', BoulderSchema);

module.exports = Boulder;