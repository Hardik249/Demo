const express = require("express");
const route = express();
const router = express.Router();
const { body, validationResult } = require('express-validator');
// const PORT = process.env.PORT || 3003;
const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('Demo', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});
// const {sequelize, DataTypes} = require('sequelize')
const User = require('./../models/user')(sequelize, DataTypes);
const assignProject = require('../models/assignproject')(sequelize, DataTypes);
const jwt = require('jsonwebtoken');
jwtKey = 'jwt';
// console.log(User);
console.log('user-routes');
router.post("/register", async (req, res) => {
  try {
    var token = randtoken.generate(16);
    class users extends User{}
    // const User = require('./models/user')(sequelize, DataTypes);
    // console.log("User details are : ", User)
    // console.log("token is : ", token)
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      contact: req.body.contact,
      role: req.body.role,
      position: req.body.position,
      DoB: req.body.DoB,
      address: req.body.address,
      status: 0,
      token: token,
      varifiedit: token,
      createdBy: req.body.createdBy,
      updatedBy: req.body.updatedBy,
    });
    // console.log("user info : ", user)
     res.send(user);
  } catch (err) {
     res.send(err);
  }

  var transporter = nodemailer.createTransport({
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
  var email = `${req.body.email}`
  var token = token
  let mailOptions = {
    from: 'hardik.karavyasolutions@gmail.com',
    to: 'hardik.karavyasolutions@gmail.com', email, 
    cc: email,
    subject: 'user approval',
    text: 'http://localhost:3003/veify/'+token
    // attachments: [{'filename': 'attachment.txt', 'content': token}] 
    }
    transporter.sendMail(mailOptions, function (error, info) {
    if(error) {
      console.log(error);
    }
    else {
      console.log('email has been sent', info);
    }
  })
})

// const User = require('./models/user')(sequelize, DataTypes);
// console.log(User)
router.get('/veify/:token', async (req, res) => {
  // const User = require('./models/user')(sequelize, DataTypes);
  class users extends User{}
  // console.log(users)
  try {
    // console.log(req.params.token)
    const user = await User.findOne({where : {token : req.params.token}});
    if(user) {
      if(user.verifiedit == user.verifiedit){
        await user.update({
        verifiedit: null,
        status: true,
        token: null,
        where: {token: req.params.token}
        })
        await user.save({ fields: ['verifiedit', 'status', 'token'] })
        // console.log(user.update())
        res.send('User verified and approved');
      } else {
        res.send('token expired!')
      }
    } else {
      res.send("token doesn't exist!");
    }
    // console.log(user)
    res.send(user);
    // console.log('token : ', user.token)
    // console.log('verifiedit : ', user.verifiedit)
    // console.log('status : ', user.status)
  } catch(err) {
    res.send(err);
  }
})


router.post('/login', async (req, res) => {
  // res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
  class users extends User{}
  try {
    const user = await User.findOne({
      where : {
        email : req.body.email,
        password : req.body.password
      }
    })
    if (user && (user.status === true)) { 
      // res.send('user approved and logged in successfully');
      jwt.sign({user}, jwtKey, {expiresIn: "1h"}, (error, token) => {
        if(error) {
          res.send("JWT Token not generated");
        }
        // res.status(201).json({token})
        res.send({user, auth: token})
        // console.log({user, auth: token})
        res.send('user approved and logged in successfully');
      })
      // res.status(200).json({message: 'user approved and logged in successfully'});
    } else {
      res.send("User not approve they can't login into system.!");
      // res.status(500).json({message: "User not approve they can't login into system.!"});
    }
    // res.send(user);
    // res.end();
    // console.log(user)
  } catch(e) {
    console.log(e instanceof Error)      // true
    console.log(e instanceof TypeError)  // false
    console.log(e.message)               // "null has no properties" "Cannot set headers after they are sent to the client"
    console.log(e.name)                  // "TypeError" "Error"
    console.log(e.fileName)              // "Scratchpad/1" undefined
    console.log(e.lineNumber)            // 2 undefined
    console.log(e.columnNumber)          // 2 undefined
    console.log(e.stack)                 // "@Scratchpad/2:2:3\n" stack
  }
})

// let user;
// let decoded;
// let createdBy;

// const verifyToken = async(req, res, next) => {
// console.log('token-1');
//   const token = req.header('Authorization');
//   if (token) {
//     try {
//       jwt.verify(token, jwtKey, function(err, decoded) {
//         if (err) {
//           return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
//         } else {
//           createdBy = decoded.user.createdBy
//           updatedBy = decoded.user.updatedBy
//           user = decoded.user
//         }
//       })
//     } 
//     catch (error) {
//       return res.status(400).send({
//         message: "UnAuthorized Person!"
//       });
//     } 
//   } 
//   else {
//     return res.status(401).send({
//       message: "Please Provide a Valid JWT Token!"
//     });
//   }
//   next();
// }

console.log('user-1');  
// router.put('/assignProject', verifyToken, async (req, res) => {
//   try {

//     console.log('user-1');
//     //
//     // class assignProjects extends assignProject{}
//     const assign_Project = await assignProject.findAll()
//     // console.log('assignProject : ', assign_Project) 
//     // console.log('assign_project data : ', assign_Project)
//     const projectId = await assignProject.findOne({
//       where: {projectId: req.body.projectId}
//     });
//     console.log('user-2');
//     let addpid;
//     let userId = [req.body.userId]
//     console.log('userId array input: ', userId)
//     // console.log(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
//     // let adduid;
//     // console.log('projectId is : ', projectId)
//     if (projectId === req.body.projectId) {
//       const deletepid = await assignProject.destroy({
//         where: {projectId: req.body.projectId}
//       });
//       // console.log('deletepid is : ', deletepid)
//       addpid = await assignProject.bulkCreate([{
//         projectId: req.body.projectId,
//         userId: userId.join()
//       }]);
//       // console.log('addpid : ', addpid)
//       // adduid = await assignProject.bulkCreate([{
//       //   userId: req.body.userId
//       // }])
//       // console.log('adduid : ', adduid)
//       // return res.status(200).send(addpid)
//     } else {
//       addpid = await assignProject.bulkCreate([{
//         projectId: req.body.projectId,
//         userId: userId.join()
//       }]);
//       // console.log('addpid : ', addpid)
//       // adduid = await assignProject.bulkCreate([{
//       //   userId: req.body.userId
//       // }])
//       // console.log('adduid : ', adduid)
//     // return res.status(200).send(addpid)
//     }
//     return res.status(200).send(addpid)
//     //
//     // return res.status(200).send({
//     //   message: "Welcome to Assign Project!"
//     // });
//     //
//   } catch (error) {
//     // console.log('assign_project error : ', error)
//     return res.status(400).send(error);
//     // res.status(404).send({
//     //   message: "Assign Project not Found!"
//     // })
//   }
// })

// router.get('/assignProjects', async (req, res) => {
//   try {
//     //
//     return res.status(200).send({
//       message: "Welcome to Assign Projects!"
//     });
//     //
//   } catch (error) {
//     res.status(404).send({
//       message: "Assign Projects not Found!"
//     })
//   }
// })
// exports.user = users;
module.exports = router;