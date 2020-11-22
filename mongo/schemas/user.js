const { Schema } = require('mongoose');

module.exports = new Schema({
    name: String,
    email: String,
    password: String,
    access: [{
        type: String
    }],
    role: String
})