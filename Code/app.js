const express = require('express');
const app = express();
const path = require('path');

//connect to database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shop');
const db = mongoose.connection;
db.on('error',(err)=>console.log(err));
db.once('open',()=>console.log("conected"));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

//const mainPage = require('./routes/mainPage');
//app.use('/',mainPage);

const manRouter = require('./routes/category');
app.use(['/mens','/womens'],manRouter);

//const womanRouter = require('./routes/women/women');
//app.use('/womens',womanRouter);
app.listen(3000);