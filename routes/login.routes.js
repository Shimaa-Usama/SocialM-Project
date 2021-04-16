const app = require('express').Router();
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model')

app.get('/', (req, res) => {
    if(req.session.isloggedin){
        res.redirect('/home')
    }else{
        res.render('login',{ pass8lt: req.flash('8lt'), oldEmail: req.flash('oldEmail'), exists: req.flash('exists'), isloggedin:req.session.isloggedin, fname:req.session.fname})
    }});

app.post('/handleSignIn', async(req, res) => {

    const { email, password} = req.body;
    const user = await userModel.findOne({email});
    if(user){
        const match = await bcrypt.compare(password, user.password);
        if(match){
            req.session.isloggedin = true;
            req.session.userID = user._id;
            req.session.fname = user.fname;
            req.session.uname = user.uname;
            req.session.email = user.email;

            req.flash('fname', req.session.fname)
            req.flash('uname', req.session.uname)

            res.redirect('/home')
        }else{
            req.flash('8lt', true)
            req.flash('oldEmail', email)

            res.redirect('/')
        }
    }else{
        req.flash('exists', true)

        res.redirect('/')

    }
    
});

module.exports = app