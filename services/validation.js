const joi = require('joi');
// const { Model, DataTypes, Sequelize, sequelize} = require('sequelize');
// const Project = require('../models/project')(sequelize, Sequelize, DataTypes);
const {sequelize, DataTypes} = require('sequelize');
const Project = require('../models/project')(sequelize, DataTypes);


// let user;
// let decoded;
// let createdBy;

const validation = async(req, res, next) => {
  class projects extends Project{}
    // joi.object({
    //   name: joi.string(),
    //   planningHours: joi.number(),
    //   actualHours: joi.number(),
    //   startDate: joi.date().format('DD/MM/YYYY'),
    //   EndDate: joi.date().format('DD/MM/YYYY'),
    //   deadline: joi.date().format('DD/MM/YYYY'),
    //   status: joi.string(),
    //   createdBy: joi.string(),
    //   updatedBy: joi.string()
    // });
  

  const schema = joi.object({
      name: joi.string(),
      planningHours: joi.number(),
      actualHours: joi.number(),
      startDate: joi.date().format('DD/MM/YYYY'),
      EndDate: joi.date().format('DD/MM/YYYY'),
      deadline: joi.date().format('DD/MM/YYYY'),
      status: joi.string(),
      createdBy: joi.string(),
      updatedBy: joi.string()
    });

  const {error, value} = joi.validate(req.body);
  // const token = req.header('Authorization');
  // if (token) {
  //   try {
  //     jwt.verify(token, jwtKey, function(err, decoded) {
  //       if (err) {
  //         return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  //       } else {
  //         // console.log('Verify JWT Token decode jwt token is : ', decoded)
  //         createdBy = decoded.user.createdBy
  //         updatedBy = decoded.user.updatedBy
  //         user = decoded.user
  //         // console.log('Verify JWT Token createdBy data : ', createdBy)        
  //         // console.log('Verify JWT Token updatedBy data : ', updatedBy)        
  //         // return res.status(200).send(decoded.user.createdBy);
  //       }
  //     })
  //     // jwtToken = jwt.verify(token, jwtKey)
  //     // decoded = jwt.decode(jwtToken)
  //     // decoded = jwt_decode(token)
  //     } 
  //   catch (error) {
  //     return res.status(400).send({
  //       message: "UnAuthorized Person!"
  //     });
  //   } 
  // } 
  // else {
  //   return res.status(401).send({
  //     message: "Please Provide a Valid JWT Token!"
  //   });
  //   // return res.status(401).send(err);
  // }
  next();
}

module.exports = validation;