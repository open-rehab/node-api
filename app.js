'use strict';

var express = require('express');
var jsonParser = require('body-parser').json;
var routes = require('./routes');
var logger = require('morgan');
var app = express();

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/sandbox");

app.use(logger('dev'));
//Pass a middleware object
app.use(jsonParser());
//Now we can pass our middleware routes for patients
app.use("/api",routes);

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("Server is running!");
});
