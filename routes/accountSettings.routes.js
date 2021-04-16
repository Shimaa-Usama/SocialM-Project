const app = require('express').Router();
const auth = require('../middleware/auth')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');
const validation = require('./validation/changePass.validation')
const { validationResult } = require('express-validator');

app.get('/settings', auth, async(req, res) => {

    res.render('accountSettings', {isloggedin:req.session.isloggedin, fname:req.session.fname, oldPass:req.flash('oldPass'), notValid:req.flash('notValid'), valid:req.flash('valid'), oldPassword: req.flash('oldPassword')})
});

app.post('/handleSettings', validation, async(req, res) => {

    const {oldPass, newPass } = req.body
    let userData = await userModel.findOne( {  _id:req.session.userID } );
    const match = await bcrypt.compare(oldPass, userData.password);
    let errors = validationResult(req);

    if(match){
        if(errors.isEmpty()){
            
            bcrypt.hash(newPass, 7, async(err, hash)=> {
                await userModel.findByIdAndUpdate( {_id:req.session.userID }, { password:hash} )
                console.log( req.body );
                res.redirect('/settings')
                });
            req.flash('valid', true)

        }else{
            req.flash('notValid', errors.array())
            req.flash('oldPassword', {oldPass})

            res.redirect('/settings')

        }
    }else{
        
        req.flash('oldPass', true)

        res.redirect('/settings')
    }
});

module.exports = app