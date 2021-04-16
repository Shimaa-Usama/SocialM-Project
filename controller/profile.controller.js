const postModel = require('../models/post.model')
const date = require('date-and-time');

module.exports.profile = async(req, res) => {

    let userPosts = await postModel.find( {  userID:req.session.userID } ).populate('userID')

    res.render('profile', {isloggedin:req.session.isloggedin, fname:req.session.fname, userPosts, userIDHasPost:req.session.email, uname:req.session.uname,})
}

module.exports.delete = async(req, res) => {
    await postModel.findByIdAndDelete( { _id:req.body.delete } )
    res.redirect('/profile')
}

module.exports.update = async(req, res) => {
    const {id, title, text} = req.body;
    const now = new Date();
    const pattern = date.compile('DD/MM/YYYY,   HH:mm');
    let time = date.format(now, pattern);
    await postModel.findByIdAndUpdate( {_id :id }, { title, text ,time} )
    res.redirect('/profile')
}