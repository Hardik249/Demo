const express = require("express");
// const app = require("./routes/routes.js");
const app = express();

const { body, validationResult } = require('express-validator');

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to App - Backend!!!" });
});

// set port, listen for requests
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}.`);
});

const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('Demo', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  dialectOptions: {
    supportBigNumbers: true
  }
});

const User = require('./models/user')(sequelize, DataTypes);
let nodemailer = require('nodemailer');
let randtoken = require('rand-token');
let generator = require('generate-password');
const StatusCodes = require('http-status-codes');

const jwt = require('jsonwebtoken')
jwtKey = 'jwt'

const {validator, Validator} = require('node-input-validator');
const bcrypt = require('bcrypt');
// const service = require('./services/service');
const joi = require('joi').extend(require('@joi/date'));;
// const passport = require('passport');
const authJwt = require('./middleware/authJwt');
const router = express.Router();
const verify = require('./middleware/verify');
// const auth = require('./middleware/auth');
// const getUser = require('./getUser');
const Project = require('./models/project')(sequelize, DataTypes);
// const projectSchema = require('./services/projectSchema');
// const validation = require('./services/validation');
const assignProject = require('./models/assignproject')(sequelize, DataTypes);
// const statuses = require('./config/config.js');
const Task = require('./models/task')(sequelize, DataTypes);
// console.log('statuses : ', statuses)
const { Op } = require("sequelize");

app.post("/register", async (req, res, next) => {
  try {
    let token = randtoken.generate(16);
    class users extends User{}
    // const User = require('./models/user')(sequelize, DataTypes);
    // console.log("User details are : ", User)
    // console.log("token is : ", token)
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      // password: bcrypt.hash(req.body.password),
      contact: req.body.contact,
      role: req.body.role,
      position: req.body.position,
      DoB: req.body.DoB,
      address: req.body.address,
      status: 0,
      token: token,
      // verifiedit: verifiedit,
      createdBy: req.body.createdBy,
      updatedBy: req.body.updatedBy,
      deletedAt: null,
    });
    // console.log("user info : ", user)
    let transporter = nodemailer.createTransport({
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
    let email = `${req.body.email}`
    token = token
    let mailOptions = {
      from: 'hardik.karavyasolutions@gmail.com',
      to: 'hardik.karavyasolutions@gmail.com', email, 
      cc: email,
      subject: 'user approval',
      text: 'http://localhost:3002/veify/'+token
      // attachments: [{'filename': 'attachment.txt', 'content': token}] 
      }
      transporter.sendMail(mailOptions, function (error, info) {
      if(error) {
        return res.status(400).send(error)
        // console.log(error);
      }
      else {
        return res.status(200).send({
          message: 'email has been sent'
        })
        // console.log('email has been sent', info);
      }
    })
    return res.status(200).send({
      message: "You have been Registered Successfully and might been recieved Mail!",
      data: user
    });
  } catch (error) {
    // console.log(error)
     return res.status(400).send(error);
  }
  return next();
})

app.get('/veify/:token', async (req, res, next) => {
  class user extends User{}
  try{
    const user = await User.findOne({where: {token : req.params.token} });
    console.log('user ', user)
  //   console.log(user instanceof User)
    if(user) {
      // console.log('user if condition execute')
      // console.log('error', error)
      // console.log('verifiedit', verifiedit)
      let t, s;
      // console.log('user.verifiedit', user.verifiedit)
      if(user.verifiedit){
        // console.log('user verifiedit if condition execute')
        t = await user.update({
        status: true,
        token: null,
        verifiedit: null,
        }, {
          where: {
            token: req.params.token
          }
        })
        // console.log('t', t)
        // s = t.save({ fields: ['status', 'token', 'verifiedit'] })
        // console.log('s', s)
        return res.status(200).send({
          message: 'User verified and approved',
          data: user
        });
      } else {
      // console.log('user verifiedit else condition execute')
        return res.status(400).send({
          message: 'token expired!'
        })
      }
    } else {
      // console.log('user else condition execute')
      // console.log(user.token)
      // console.log(error)
      return res.status(404).send({
        message: "token doesn't exist!"
      });
    }
    // console.log(user)
    return res.status(200).send(user);
    // console.log('token : ', user.token)
    // console.log('verifiedit : ', user.verifiedit)
    // console.log('status : ', user.status)
  } catch(error) {
    // console.log(error)
    // return res.status(400).send(error);
  }
  return next();
})


app.post('/login', async (req, res) => {
  // res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
  class users extends User{}
  try {
    const user = await User.findOne({
      where : {
        email : req.body.email,
        password : req.body.password
      }
    })
    // console.log(user)
    if (user && user.status) { 
      // res.send('user approved and logged in successfully');
      jwt.sign({user}, jwtKey, {expiresIn: "12h"}, (error, token) => {
        if(error) {
          res.status(400).send({
            message: "JWT Token not generated"
          });
        } else {
          // res.status(201).json({token})
          return res.status(200).send({user, auth: token})
          // return res.send('user approved and logged in successfully');
        }
      })
      // res.status(200).json({message: 'user approved and logged in successfully'});
    } else {
      return res.status(401).send({
        message: "User not approve they can't login into system.!"
      });
      // res.status(500).json({message: "User not approve they can't login into system.!"});
    }
    // res.send(user);
    // res.end();
  } catch(error) {
    // console.log(error)
    return res.status(400).send({
      message: "Please Provide valid email and password!"
    })
  }
})

app.post('/changePassword/:user_id', async (req, res) => {
  class users extends User{}
  try {
    const user = await User.findOne({ where: { user_id: req.params.user_id } });
    // console.log(user)
    if (user) {
      // const token = req.header(tokenHeaderKey);
      // const token = req.header(BearerToken);
      const token = req.header('Authorization')
      // console.log(token)    
      const verified = jwt.verify(token, jwtKey);
      if(verified){
        const validationRule = {
          old_password: req.body.old_password,
          new_password: req.body.new_password,
          confirm_password: req.body.confirm_password,
        }
        const v = new Validator(req.body, validationRule, {
          old_password: req.body.old_password,
          new_password: req.body.new_password,
          confirm_password: req.body.confirm_password,
        });
        // console.log(req.body.old_password)
        // console.log(user.password)
        // console.log('old password + '+req.body.old_password)
        // console.log('user password + '+user.password)
        // if (bcrypt.compareSync(req.body.old_password, user.password)) {
        if ( req.body.old_password == user.password) {
          // console.log(req.body.old_password)
          // console.log(user.password)
          if (req.body.new_password == req.body.confirm_password) {
            await user.update({
              password: req.body.confirm_password,
              // status: true,
              // token: null,
              where: {user_id: req.params.user_id}
              })
              // console.log(user.update())
              await user.save({ field: ['password'] })
          } else {
            return res.status(400).send({
              message: "New Password and Confirm Password don't Match.!",
              data: user
            })
          }
        } else {
          // res.status(400).send(error)
          return res.status(400).send({
            message: "Old Password doesn't Match.!",
            data: v
          })
          // console.log(req.body.old_password)
          // console.log(user.password)
        }
        // res.send("Successfully Verified");
        // res.send("Password Successfully Changed");
        return res.status(200).send({
          message: "Password Successfully Changed",
          data: user
        })
      } else {
        // console.log(error)
        // Access Denied
        return res.status(401).send(error.message) // name: JsonWebTokenError message: jwt must be provided
        // return res.status(401).send({
        //   message: error // name: JsonWebTokenError message: jwt must be provided
        // });
      }
    } else {
      // console.log(error)
      return res.status(404).send({
        message: "User not Found!"
      })
    }
  } catch (error) {
    // console.log(error)
    // Access Denied
    return res.status(401).send(error) // name: JsonWebTokenError message: invalid token or jwt expired with expiredAt Datetime within Current Timestamp
    // return res.status(401).send({
    //   message: error // name: JsonWebTokenError message: invalid token or jwt expired with expiredAt Datetime within Current Timestamp 
    // });
  }
});


app.post('/forgotPassword', async (req, res) => {
  class users extends User{}
  try {
    let token = randtoken.generate(16);
    const user = await User.findOne({
      where : {
        // user_id: req.params.user_id
        email : req.body.email
        // password : req.body.password
      }
    })
    if (user) {
      await user.update({
        token: token,
        where: {token: null}
      })
      // console.log(user.update())
      await user.save({field: ['token']})
      // console.log(user.save())
      // return res.status(200).send(user)
      // class service extends service{}
      let transporter = nodemailer.createTransport({
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
      let email = `${req.body.email}`
      let token = token
      let mailOptions = {
        from: 'hardik.karavyasolutions@gmail.com',
        to: 'hardik.karavyasolutions@gmail.com', email, 
        cc: email,
        subject: 'Set New Password',
        // text: 'http://localhost:3002/setNewPassword/'+jwtToken
        text: 'http://localhost:3002/setNewPassword/'+token
        // text: 'http://localhost:3002/setNewPassword/'
        // content: token
        // attachments: [{'filename': 'attachment.txt', 'content': token}] 
        }
        transporter.sendMail(mailOptions, function (error, info) {
        if(error) {
          // console.log(error);
          return res.status(400).send({
            message: "email hasn't been sent"
            // data: error
          })
          // console.log(error);
        }
        else {
          // console.log('email has been sent', info);
          return res.status(200).send({
            message: "email has been sent",
            data: info
          })
        }
      })
    } else {
      return res.status(404).send({
        message: "User not Found!"
      })
    }
  } catch (error) {
        // Access Denied
        // console.log(error)
        return res.status(400).send({
          message: "Please Provide a Valid email!"
        })
        // return res.status(401).send(error.message);
  }  
});

app.get('/setNewPassword/:token', async (req, res) => {
  class user extends User{}
  try{
    const user = await User.findOne({where : {token : req.params.token}});
    // res.send(user)
    // console.log('user data : ', user)
    // console.log(user instanceof User)
    if(user) {
      const schema = await joi.object({
        password: joi.string(),
        confirmPassword: joi.ref('password'),
      });
      // validate request body against schema
      const { error, value } = await schema.validate(req.body);
      if (error) {
        return res.status(200).send({
          message: `Validation error: ${error.details.map(x => x.message).join(', ')}`
        });
      } else {
        await user.update({
        password: req.body.confirmPassword,
        where: {token: req.params.token}
        })
        await user.save({ field: ['password'] })
        user.update({
        token: null,
        where: {password: user.save()}
        })
        user.save({ field: ['token'] })
        return res.status(200).send(user)
      } 
      // throw new Exception(error) 
    // res.status(200).send("Welcome to Set New Password!");
    } else {
      return res.status(400).send("User not Found!");
    }
  }
  catch(error) {
    // res.status(400).send({
    //   message: "Link is Expired!"
    // })
    // return res.status(400).send(error.message)
    // console.error(error)
    // console.error(error.lineNumber)
  }
})

let user;
let decoded;
let createdBy;

const verifyToken = async(req, res, next) => {
  const token = req.header('Authorization');
  if (token) {
    try {
      jwt.verify(token, jwtKey, function(err, decoded) {
        if (err) {
          return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        } else {
          createdBy = decoded.user.createdBy
          updatedBy = decoded.user.updatedBy
          user = decoded.user
        }
      })
    } 
    catch (error) {
      return res.status(400).send({
        message: "UnAuthorized Person!"
      });
    } 
  } 
  else {
    return res.status(401).send({
      message: "Please Provide a Valid JWT Token!"
    });
  }
  // next();
}

// app.use(verifyToken);

app.get('/user/list', verifyToken, async (req, res) => {
  try {
    class users extends User{}
    const user = await User.findAll();
    res.status(200).send(user);
  } catch (error) {
    // return res.status(400).json(error)
  }
})

app.post('/user/add', verifyToken, async (req, res, next) => {
  // res.send("Hello")
  // const getLogging = getUser();
  // console.log('user add createdBy : ', createdBy)
  // console.log('user add updatedBy : ', updatedBy)
  try {
    class users extends User{}
    const schema = await joi.object({
      name: joi.string().alphanum().min(2).max(255),
      email: joi.string().email().required(),
      // password: joi.string(),
      contact: joi.number().integer().min(10).max(10),
      role: joi.string(),
      position: joi.string(),
      DoB: joi.date().format('YYYY/MM/DD').greater('1974-1-1').less('2005-1-1'),
      address: joi.string(),
      // status: joi.boolean(),
      // token: joi.string().allow(null, ''),
      // verifiedit: joi.string().allow(null, ''),
    });
    // console.log('user add validation schema : ', schema)
    const { error, value } = await schema.validate(req.body);
    // console.log('user add validation error : ', error)
    // console.log('user add validation user data value : ', value)
    if(value){
      password = generator.generate({
        length: 10,
        numbers: true
      })
      // console.log(password)
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: password,
        contact: req.body.contact,
        role: req.body.role,
        position: req.body.position,
        DoB: req.body.DoB,
        address: req.body.address,
        status: 1,
        token: null,
        verifiedit: null,
        createdBy: createdBy,
        updatedBy: updatedBy,
        deletedAt: null,
      });
      // console.log(user)
      let transporter = nodemailer.createTransport({
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
      let email = `${req.body.email}`
      // console.log(password)
      let mailOptions = {
        from: 'hardik.karavyasolutions@gmail.com',
        to: 'hardik.karavyasolutions@gmail.com', email, 
        cc: email,
        subject: 'Congratulations User has been Successfully Added User Credentials',
        text: 'username is : ' + email +' and '+ 'password is : ' + (user.password)
        // text: 'http://localhost:3002/setNewPassword/'
        }
        transporter.sendMail(mailOptions, function (error, info) {
        if(error) {
          // console.log(error);
          return res.status(400).send(error)
          // res.status(400).send(error)
          // return res.status(400).send({
          //   message: "email hasn't been sent"
          //   // data: error
          // })
          // console.log(error);
        }
        else {
          // console.log('email has been sent', info);
          return res.status(200).send({
            message: "email has been sent",
            data: user
          })
          // console.log('email has been sent', info);
        }
      })
    } else {
      return res.status(200).send({
        message: `Validation error: ${error.details.map(x => x.message).join(', ')}`
      });
      // console.log(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    }
  } catch (error) {
    // console.log(error)
     // return res.status(400).send(error);
  }
  // next();
})

app.get('/user/edit', verifyToken, async (req, res, next) => {
  try {
    // class users extends User{}    
    // const user = await User.findOne({where : {user_id : req.params.user_id}});
    return res.status(200).send(user)
  } 
  catch (error) {
    // return res.status(400).send(error.message);
  }
  // next();
})

app.put('/user/update', verifyToken, async (req, res, next) => {
  try {
    //
    // class users extends User{}    
    // const user = await User.findOne({where : {user_id : req.params.user_id}});
    // return res.status(200).send(user)
    // console.log('user data : ', user)
    // console.log('user name is : ', user.name)
    //    
    if (user) {
    const schema = await joi.object({
    name: joi.string(),
    email: joi.string().email(),
    password: joi.string(),
    contact: joi.number(),
    role: joi.string(),
    position: joi.string(),
    DoB: joi.date(),
    address: joi.string(),
    status: joi.boolean(),
    token: joi.string().allow(null, ''),
    verifiedit: joi.string().allow(null, ''),
    // deletedAt: joi.string().allow(null, ''),
    // createdBy: joi.string(),
    // updatedBy: joi.string()
    });
    // console.log(schema)
    const { error, value } = await schema.validate(req.body);
    // console.log(error)
    // console.log(value)
    if (value) {
      let condition = {where: {user_id: user.user_id}};
      options = { multi: true };
      // console.log('value', value)
      const values = await User.update(value, condition, options)
      // console.log('values : ', values)
      // console.log('user : ', user)
      // const save = await values.save({
      //   fields: ['name', 'email', 'password', 'contact', 'role', 'position', 'DoB', 'address']
      // });
      // console.log('save : ', save)
      return res.status(200).send(value) 
      } else {
        // console.log('error:', error)
        return res.status(400).send(error)
      }
    } else {
      // console.log('error', error)
      return res.status(404).send(error.message)
    }
  } catch (error) {
    // console.log(error)
    // return res.status(400).send(error)
  }
  next();
})

app.delete('/user/delete', verifyToken, async (req, res) => {
  try {
    // class users extends User{}
    // const user = await User.findOne({where : {user_id : req.params.user_id}});
    if (user) {
      await User.destroy({
        where: {
          user_id: user.user_id
        }
      });
      // console.log('user delete ', user)
      return res.status(200).send(user);
    } else {
      return res.status(404).send({
        message: "User not Found!"
      })
    }
  } catch (error) {
    // return res.status(400).send(error.message)
  }
})

app.get('/project', async (req, res) => {
  //
  return res.status(200).send({
    message: "Project!"
  });
  //
})

// const validation = require('./services/validation');
// const {schema, error, value} = require('./services/validation');

// let user;
// let decoded;
// let createdBy;

let Schema;
let error;
let value;

const validation = async(req, res, next) => {
  class projects extends Project{}
  schema = joi.object({
    name: joi.string().regex(/^[,. A-Za-z]+$/).required(),
    planningHours: joi.number().required(),
    actualHours: joi.number().required(),
    startDate: joi.date().format('YYYY-MM-DD').required(),
    EndDate: joi.date().format('YYYY-MM-DD').required(),
    deadline: joi.date().format('YYYY-MM-DD').required(),
    status: joi.string().regex(/^[,. A-Za-z]+$/).required()
  });

  let {error, value} = schema.validate(req.body);
  if(error) {
    return res.status(200).send({
      message: `Validation error: ${error.details.map(x => x.message).join(', ')}`
    });
  } else {
    value = new Project();
  }
  next();
}

app.post('/projects/add', verifyToken, validation, async (req, res, next) => {
  try {
    //
    // res.status(200).send({
    //   message: "Projects add here!"
    // });
    //
    // console.log('add project here!')
    class projects extends Project{}
    // console.log('add project here call!')
    // console.log('request body', req.body) 
    // values = schema.validate(req.body)
    // console.log('validation value add project', values)   
    const project = await Project.create({
      name: req.body.name,
      planningHours: req.body.planningHours,
      actualHours: req.body.actualHours,
      startDate: req.body.startDate,
      EndDate: req.body.EndDate,
      deadline: req.body.deadline,
      status: req.body.status,
      createdBy: createdBy,
      updatedBy: updatedBy
    });
    // console.log('name value', value)
    // console.log('project create by schema : ', project)
    return res.status(200).send(project); 
  } catch (error) {
    // return res.status(400).send(error);
  }
  next();
})

app.get('/projects/list', verifyToken, async (req, res) => {
  try {
    class projects extends Project{}
    const project = await Project.findAll();
    return res.status(200).send(project);
  } catch (error) {
    // return res.status(404).send(error)
  }
  next();
})

app.get('/projects/edit/:project_id', verifyToken, async (req, res, next) => {
  try {
    class projects extends Project{}
    const project = await Project.findOne({
      where: {
        project_id: req.params.project_id
      }
    });
    if (project) {
      return res.status(200).send(project);
    } else {
      return res.status(200).send({
        message: "Project not Found!"
      });
    }
  } catch (error) {
    // return res.status(404).send(error);
  }
  next();
})

app.put('/projects/update/:project_id', verifyToken, validation, async (req, res, next) => {
  try {
    // console.log('validation', validation)
    class projects extends Project{}
    const project = await Project.findOne({
      where: {
        project_id: req.params.project_id
      }
    });
    // console.log('project data : ', project)
    if (project) {
      const projectData = await Project.update({
      name: req.body.name,
      planningHours: req.body.planningHours,
      actualHours: req.body.actualHours,
      startDate: req.body.startDate,
      EndDate: req.body.EndDate,
      deadline: req.body.deadline,
      status: req.body.status,
      createdBy: user.createdBy,
      updatedBy: user.updatedBy
      }, {
        where: {project_id: req.params.project_id}
      });
      // console.log('projectData update data : ', projectData)
      // const save = await Project.save({fields:
      //   ['name', 'planningHours', 'actualHours', 'EndDate', 'deadline', 'status', 'createdBy', 'updatedBy']
      // });
      // console.log('projects updated save data : ', save)
      return res.status(200).send(projectData);
      // return res.status(200).send(project);
      } else {
        return res.status(404).send({
          message: "Project not Found!"
        })
      }
  } catch (error) {
    // console.log(error)
    // return res.status(400).send(error);
  }
  next();
})

app.delete('/projects/delete/:project_id', verifyToken, async (req, res, next) => {
  try {
    class projects extends Project{}
    const project = await Project.findOne({
      where: {
        project_id: req.params.project_id
      }
    });
    // console.log('project data : ', project)
    if (project) {
      const projectsData = await Project.destroy({
        where: {
          project_id: req.params.project_id
        }
      });
      // console.log('delete project data', projectsData)
      // console.log('delete project', project)
      return res.status(200).send(project)
    } else {
      return res.status(404).send({
        message: "Project not Found!"
      })
    }
    // res.sendStatus(200).json(projects)
    // res.sendStatus(200)
    // res.status(200).send(project)
    // console.log('projects deletedAt data : ', project)
  } catch (error) {
    // return res.status(400).send(error);
    // console.log(error)
  }
  next();
})

app.put('/assignProject', verifyToken, async (req, res) => {
  try {
    //
    class assignProjects extends assignProject{}
    const project = await Project.findOne({where: {project_id: req.body.projectId}})
    // console.log('projects', project)
    if (project) {
        let value = [];
        let userId = req.body.userId
        // console.log('userId array input: ', userId)
        const user = await User.findAll({
          where: {
            user_id: {
              [Op.in]: userId
            },
            status: true
          }
        })
        // console.log('user ', user)
        if (user.length > 1) {
          // console.log('user if condition execute')
          let i, uid, addpid, data;
          const projectId = await assignProject.findOne({
            where: {projectId: req.body.projectId}
          });
          // let pid = req.body.projectId
          // console.log('projectId single input: ', pid)
          // console.log(value)
          // let userId = [87, 117, 119]
          uid = userId.forEach((item, index)=>{
            if(userId || user.user_id) {
              // console.log('userId if condition execute')
              value.push({projectId: req.body.projectId, userId: item})
            } else {
              // console.log('UserId else condition execute')
              return res.json("userId " + userId.item +" doesn't exist!");
            }
          })
          if (projectId && req.body.projectId) {
            // console.log('projectId and body projectId are same!')
            const deletepid = await assignProject.destroy({
              where: {projectId: req.body.projectId}
            });
            addpid = await assignProject.bulkCreate(value)
            .then(function(response){
                return res.json(response);
            });
          } else {
            // console.log('projectId and body projectId are not same!')
            addpid = await assignProject.bulkCreate(value)
            .then(function(response){
                return res.json(response);
            });
          }
          return res.status(200).send(projectId)
        } else {
          // console.log('user else condition execute')
          return res.status(404).send({
            message: "Enter correct User"
          })
        }
      } else {
        return res.status(404).send({
          message: "Enter correct Project"
        })
      }
    //
    // return res.status(200).send({
    //   message: "Welcome to Assign Project!"
    // });
    //
  } catch (error) {
    // console.log('assign_project error : ', error)
    // return res.status(400).send(error);
    // res.status(404).send({
    //   message: "Assign Project not Found!"
    // })
  }
})

app.get('/assignProjects', async (req, res) => {
  try {
    //
    return res.status(200).send({
      message: "Welcome to Assign Projects!"
    });
    //
  } catch (error) {
    return res.status(404).send({
      message: "Assign Projects not Found!"
    })
  }
})

const validationTask = async(req, res, next) => {
  class tasks extends Task{}
  class projects extends Project{}
  projectId = await Project.findOne({
    where: {
      project_id: req.body.project_id
    }
  })
  // console.log('projectId', projectId)
  const method = (value, helpers) => {
    if (value && projectId) {
      // console.log('projectId if condition : ', projectId)
      // console.log('projectId if condition execute')
      return value;
    } else {
      // console.log('projectId else condition : ', projectId)
      // console.log('projectId else condition execute')
      // return false
      return res.status(400).send({
        message: "project id doesn't Match!"
      });
      // throw new Error("nope");
    }
  };
  userId = await assignProject.findOne({
    where: {
      userId: req.body.user_id
    }
  })
  // console.log('userId', userId)
  const method1 = (value, helpers) => {
    if (value && userId) {
      // console.log('userId if condition execute')
      return value;
    } else {
      // console.log('userId else condition execute')
      // return false
      return res.status(400).send({
        message: "user id doesn't Match!"
      })
      // throw new Error("nope");
    }
  }
  schema = joi.object({
    name: joi.string().required(),
    planningHours: joi.number().required(),
    startDate: joi.date().format('YYYY-MM-DD').required(),
    EndDate: joi.date().format('YYYY-MM-DD').greater(joi.ref('startDate')).required(),
    status: joi.number().valid(0, 1, 2, 3).required(),
    project_id: joi.number().custom(method, "custom validation").required(),
    user_id: joi.number().custom(method1,  "custom validation").required()
  })
  let {error, value} = schema.validate(req.body);
  // console.log('validationTask schema request body value : ', error)
  if(error) {
    // return res.status(200).json({error.details.map(x => x.message).join(', ')})
    // console.log('error validationTask : ', error)
    return res.status(200).json({
      message: error.details.map(x => x.message).join(', ')
    });
  } else {
    value = new Task();
  }
  next();
}

app.post('/tasks/add', verifyToken, validationTask, async (req, res) => {
  try {
    //
    // res.status(200).send({
    //   message: "Welcom to add Tasks!"
    // });
    //
    class tasks extends Task{}
    const task = await Task.create({
      name: req.body.name,
      planningHours: req.body.planningHours,
      startDate: req.body.startDate,
      EndDate: req.body.EndDate,
      createdBy: createdBy,
      updatedBy: updatedBy,
      status: req.body.status,
      project_id: req.body.project_id,
      user_id: req.body.user_id
    });
    // console.log('task create by schema : ', task)
    return res.status(200).send(task); 
    // res.status(200).send({
    //   message: "Welcom to add Tasks!"
    // });
    //
  } catch (error) {
    // console.log('task add error : ', error)
    // return res.status(400).send(error)
  }
})

app.get('/tasks/list', verifyToken, async (req, res) => {
  try {
    class tasks extends Task{}
    const task = await Task.findAll()
    return res.status(200).send(task)
  } catch (error) {
    // console.log('task add error : ', error)
    // return res.status(400).json(error) 
  }
})

app.get('/tasks/edit/:task_id', verifyToken, async (req, res) => {
  try {
    class tasks extends Task{}
    const task = await Task.findOne({
      where: {
        task_id: req.params.task_id
      }
    })
    if (task) {
      return res.status(200).send(task)
    } else {
      return res.status(400).json({
        message: "task doesn't exist!"
      }) 
    }
  } catch (error) {
    // console.log('task add error : ', error)
    // return res.status(400).json(error) 
  }
})

app.put('/tasks/update/:task_id', verifyToken, validationTask, async(req, res) => {
  try {
    // console.log('tasks update API')
    const task = await Task.update({
      name: req.body.name,
      planningHours: req.body.planningHours,
      startDate: req.body.startDate,
      EndDate: req.body.EndDate,
      createdBy: user.createdBy,
      updatedBy: user.updatedBy,
      status: req.body.status,
      project_id: req.body.project_id,
      user_id: req.body.user_id
    }, {
      where: {
        task_id: req.params.task_id
      }
    });
    // console.log('task update : ', task)
    // const save = await Task.save({fields:
    //   ['name', 'planningHours', 'EndDate', 'status', 'createdBy', 'updatedBy', 'project_id', 'user_id']
    // });
    // console.log('task save : ', save)
    return res.status(200).send(task);
    // return res.status(200).send(task)
  } catch(error) {
    // console.log('task update and save error : ', error)
    // return res.status(400).send(error)
  } 
})

app.delete('/tasks/delete/:task_id', verifyToken, async (req, res) =>{
  try {
    class tasks extends Task{}
    const task = await Task.destroy({
      where: {
        task_id: req.params.task_id
      }
    });
    // console.log('task deleted data : ', task)
    // return res.status(200).send(task)
    return res.status(200).json(task)
  } catch (error) {
    // console.log(error)
    // return res.status(400).json(error)
  }
})

const validateTaskStatus = async (req, res, next) => {
  class tasks extends Task{}
  const task = await Task.findOne({
    where: {
      task_id: req.params.task_id
    }
  });
  // console.log('task ', task)
  if (task) {
    const taskScema = joi.object({
      status: joi.number().valid(0, 1, 2, 3).required()
    });
    // console.log('task status schema : ', taskScema._ids._byKey)
    const {error, value} = taskScema.validate(req.body)
    if (error) {
      // console.log('error validationTask : ', error)
      return res.status(200).send({
        message: error.details.map(x => x.message).join(', ')
      });
    } 
    else {
      // console.log('value request body : ', value)
    }
  } else {
    return res.status(404).send({
      message: "Task not Found!"
    });
  }
  next();
}

app.put('/tasks/update/status/:task_id', verifyToken, validateTaskStatus, async(req, res) => {
  try{
    //
    class tasks extends Task{}
    const taskStatus = await Task.update({
      status: req.body.status,
      createdBy: user.createdBy,
      updatedBy: user.updatedBy,
    }, {
      where: {
      task_id: req.params.task_id
      }
    })
    // console.log("taskStatus : ", taskStatus)
    return res.status(200).send(taskStatus)
    //
  } catch(error) {
    //
    // console.log(error)
    // return res.status(200).json(error);
    //
  }
})