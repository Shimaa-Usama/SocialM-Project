const app = require('express').Router();
const { validationResult } = require('express-validator');
const validation = require('./validation/register.validation');
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');

app.get('/register', (req, res) => {
    if(req.session.isloggedin){
        res.redirect('/home')
    }else{
        res.render('registeration', {errors: req.flash('errors'), exists:req.flash('exists'),  oldInputs: req.flash('oldInputs')})
    }
});

app.post('/handleSignUp',validation ,async(req, res) => {

    const {fname, lname , uname, email, password} = req.body;
    let errors = validationResult(req);
    let user = await userModel.findOne({email});
    if(user){
        req.flash('exists', true)
        res.redirect('/register')
    }
    else{
        if(errors.isEmpty()){
            bcrypt.hash(password, 7, async(err, hash)=> {
            await userModel.insertMany({fname, lname , uname, email, password:hash})
            console.log( req.body );
            res.redirect('/')
            });

        }else{
            console.log(errors.array());
            req.flash('errors', errors.array());
            req.flash('oldInputs', {fname, lname , uname, email, password})

            res.redirect('/register')
        }
    }
});

module.exports = app