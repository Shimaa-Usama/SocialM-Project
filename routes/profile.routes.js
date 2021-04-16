const app = require('express').Router();
const auth = require('../middleware/auth')
const profileController = require('../controller/profile.controller')

app.get('/profile',auth, profileController.profile);


app.post('/deleteProfile', profileController.delete);


app.post('/updateProfile', profileController.update);

module.exports = app