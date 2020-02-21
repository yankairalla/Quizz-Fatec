const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    age: {
        type: Number,
        min: 1,
        max: 100
    },
    gender: {
        type: String
    }

})

module.exports = mongoose.model('User', userSchema)