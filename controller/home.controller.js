const postModel = require('../models/post.model')
const date = require('date-and-time');


module.exports.home = async(req, res) => {

    let posts = await postModel.find( { } ).populate('userID')
    // console.log(posts);
    // res.json(posts)
    res.render('home', {isloggedin:req.session.isloggedin, fname:req.session.fname, uname:req.session.uname, userIDHasPost:req.session.email, posts, oldData:req.flash('oldData')})
}


module.exports.add =  async(req, res) => {
    
    const { title, text } = req.body;
    const now = new Date();
    const pattern = date.compile('DD/MM/YYYY,   HH:mm');
    let time = date.format(now, pattern); 

    await postModel.insertMany( { title, text, time, userID:req.session.userID } );
    res.redirect('/home')

}

module.exports.delete =  async(req, res) => {
    await postModel.findByIdAndDelete( { _id:req.body.delete } )
    res.redirect('/home')
}

module.exports.update = async(req, res) => {
    const {id, title, text} = req.body;
    const now = new Date();
    const pattern = date.compile('DD/MM/YYYY,   HH:mm');
    let time = date.format(now, pattern);
    await postModel.findByIdAndUpdate( {_id :id }, { title, text ,time} )
    res.redirect('/home')
}

