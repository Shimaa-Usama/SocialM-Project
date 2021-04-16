const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fname:String,
    lname:String,
    uname:String,
    email:String,
    password:String
})

module.exports = mongoose.model('user', userSchema)