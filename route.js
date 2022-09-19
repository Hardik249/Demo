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
const User = require('./models/user')(sequelize, DataTypes);
const api = require('./controllers/users');
// const router = express.Router();
var nodemailer = require('nodemailer');
var randtoken = require('rand-token');
// route.listen(PORT, () => {
//   console.log(`Server is up and running on port ${PORT}.`);
// });

// parse requests of content-type - application/json
route.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
route.use(express.urlencoded({ extended: true }));

// simple route
// route.get("/", (req, res) => {
//   res.json({ message: "Welcome to App - Backend!!!" });
// });

// route.use('/api', (req, res) => {
//   res.json({ message: "Welcome!!!" });
// })

route.use('/api', api);

//if route not found 
route.use((req, res, next) => {
  res.status(404).json({
    error: 'bad request'
  })
});

// let Sequelize;

module.exports = route;