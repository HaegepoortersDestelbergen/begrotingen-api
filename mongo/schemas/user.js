const { Schema } = require('mongoose');

module.exports = new Schema({
    name: String,
    email: String,
    password: String,
    access: [{
        id: String,
        type: { type: String }
    }],
    role: String
})