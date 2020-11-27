const { Schema } = require('mongoose');

module.exports = new Schema({
    title: String,
    comment: String,
    budgetId: String,
    category: String,
    type: String,
    when: String,
    amount: Number,
    created: Date  
})