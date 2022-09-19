const express = require("express");

// const routes = require("./routes/routes.js");
const app = express();
const { route } = app();

const { body, validationResult } = require('express-validator');

// parse requests of content-type - application/json
route.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
route.use(express.urlencoded({ extended: true }));

// simple route
route.get("/", (req, res) => {
  res.json({ message: "Welcome to App - Backend!!!" });
});

// set port, listen for requests
const PORT = process.env.PORT || 3003;

// const { Sequelize, Op, Model, DataTypes } = require("sequelize");
// const sequelize = new Sequelize("sqlite::memory:");
// const sequelize = require('./models/user');
const { Model, DataTypes, Sequelize, sequelize } = require('sequelize');


const User = require('./models/user');
var nodemailer = require('nodemailer');
var randtoken = require('rand-token');


module.exports = { app } ;
module.exports = { route } ;