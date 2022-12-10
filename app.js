var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var companyRoutter = require('./routes/company')
var staffRoutter = require('./routes/staff')

var app = express();
mongoose.connect('mongodb+srv://sumeth:0U4awnrAu1qCy1a2@1913210264-touch.wy7zzms.mongodb.net/restfulapi?retryWrites=true&w=majority' ,
 {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/company',companyRoutter);
app.use('/staff',staffRoutter )

module.exports = app;
