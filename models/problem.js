const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProblemSchema = new Schema({
    type: {
        type: String,
        enum: ['boulder', 'route'],
        required: true,
    },
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
        type: Number,
        required: true,
        min: 1,
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

ProblemSchema.virtual("title").get(function () {
    let title = "";
    
    if (this.type === 'boulder') {
        title = `${this.color} V${this.grade}`;
    } else {
        title = `${this.color} 5.${this.grade}`;
    }

    return title;
})

const Problem = mongoose.model('Problem', ProblemSchema);

module.exports = Problem;