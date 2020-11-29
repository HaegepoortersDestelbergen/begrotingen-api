const { Schema } = require('mongoose');

module.exports = new Schema({
    budgetId: String,
    expires: String,
    rights: String,
    label: String,
    created: Date
})