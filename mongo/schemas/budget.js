const { Schema } = require('mongoose');

module.exports = new Schema({
    title: String,
    comment: String,
    groupId: String,
    people: {
        free: Number,
        paying: Number
    },
    period: {
        start: Date,
        end: Date
    },
    created: Date
})