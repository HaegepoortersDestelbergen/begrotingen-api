const { Schema } = require('mongoose');

module.exports = new Schema({
    budgetId: String,
    expires: Date,
    rights: String,
    label: String
})