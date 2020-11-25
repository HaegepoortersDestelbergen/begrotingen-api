const { Schema } = require('mongoose');

module.exports = new Schema({
    name: String,
    email: String,
    password: String,
    access: [{
        budgetId: String,
        type: { type: String }
    }],
    role: Number
})