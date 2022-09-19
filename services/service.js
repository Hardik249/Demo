const express = require("express");
const route = express();
const { body, validationResult } = require('express-validator');
// const PORT = process.env.PORT || 3003;
// const con = require('./con');
const StatusCodes = require('http-status-codes');

const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('Demo', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});
const User = require('../models/user')(sequelize, DataTypes);
// const userRoute = require('./controllers/routes/users');
// const router = express.Router();
var nodemailer = require('nodemailer');
var randtoken = require('rand-token');
const jwt = require('jsonwebtoken')
// const emailToken = jwt.sign({email: user.email}, process.env.EMAIL_JWT_SECRET)
const emailToken = jwt.sign({email: User.email}, 'key');
const PORT = process.env.PORT || 3002;
const url = `http://localhost:${PORT}/`

class user extends User{}

const setNewPassword = function setNewPassword(name){}


var service = nodemailer.createTransport({
  // service: 'gmail',
host: 'smtp.gmail.com',
port: 587,
secure: false,
requireTLS: true,
auth: {
  user: 'hardik.karavyasolutions@gmail.com',
  pass: 'nbcuxejiasnmopsa'
  }
});
// var email = `${req.body.email}`
var email = User.email;
var token = token
let mailOptions = {
  from: 'hardik.karavyasolutions@gmail.com',
  to: 'hardik.karavyasolutions@gmail.com', email, 
  cc: email,
  subject: 'user approval',
  // text: 'http://localhost:3003/'+token
  text: url+setNewPassword+emailToken
  // attachments: [{'filename': 'attachment.txt', 'content': token}] 
  }
  service.sendMail(mailOptions, function (error, info) {
  if(error) {
    console.log(error);
  }
  else {
    console.log('email has been sent', info);
  }
})



module.exports = service;