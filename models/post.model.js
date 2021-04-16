const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    
    title:String,
    text:String,
    time: String,
    userID:{type:mongoose.Schema.Types.ObjectId, ref:'user'}

})

module.exports = mongoose.model('post', postSchema)