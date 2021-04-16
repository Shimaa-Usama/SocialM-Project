const app = require('express').Router();
const auth = require('../middleware/auth')
const postModel = require('../models/post.model')
const date = require('date-and-time');
const moment = require('moment');
const homeController = require('../controller/home.controller')

app.get('/home', auth, homeController.home);
app.post('/addPost', homeController.add);
app.post('/delete', homeController.delete);
app.post('/update', homeController.update);
module.exports = app