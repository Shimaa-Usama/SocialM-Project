const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const mongoose = require('mongoose');
const flash = require('connect-flash');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
  uri: 'mongodb+srv://admin:admin@shu.j3esi.mongodb.net/SocialMProject',
  collection: 'mySessions'
});


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store
    }))
app.use(flash())

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended:false }));
app.use(require('./routes/login.routes'))
app.use(require('./routes/register.routes'))
app.use(require('./routes/home.routes'))
app.use(require('./routes/profile.routes'))
app.use(require('./routes/accountSettings.routes'))
app.use(require('./routes/logout.routes'))

app.get('**', (req, res) => {
  res.send('Not Found');
});



mongoose.connect('mongodb+srv://admin:admin@shu.j3esi.mongodb.net/SocialMProject', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('connected')
})
.catch(()=>{console.log('ERR!')});



app.listen(process.env.PORT|| port, () => console.log(`Example app listening on port port!`))