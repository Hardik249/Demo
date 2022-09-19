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
const users = require('./../models/user')(sequelize, DataTypes);
const assignProject = require('../models/assignproject')(sequelize, DataTypes);
const verifyToken = require('../services/verifyToken');

router.put('/assignProject', verifyToken, async (req, res) => {
  try {

    console.log('user-1');
    //
    // class assignProjects extends assignProject{}
    const assign_Project = await assignProject.findAll()
    // console.log('assignProject : ', assign_Project) 
    // console.log('assign_project data : ', assign_Project)
    const projectId = await assignProject.findOne({
      where: {projectId: req.body.projectId}
    });
    console.log('user-2');
    let addpid;
    let userId = [req.body.userId]
    console.log('userId array input: ', userId)
    // console.log(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    // let adduid;
    // console.log('projectId is : ', projectId)
    if (projectId === req.body.projectId) {
      const deletepid = await assignProject.destroy({
        where: {projectId: req.body.projectId}
      });
      // console.log('deletepid is : ', deletepid)
      addpid = await assignProject.bulkCreate([{
        projectId: req.body.projectId,
        userId: userId.join()
      }]);
      // console.log('addpid : ', addpid)
      // adduid = await assignProject.bulkCreate([{
      //   userId: req.body.userId
      // }])
      // console.log('adduid : ', adduid)
      // return res.status(200).send(addpid)
    } else {
      addpid = await assignProject.bulkCreate([{
        projectId: req.body.projectId,
        userId: userId.join()
      }]);
      // console.log('addpid : ', addpid)
      // adduid = await assignProject.bulkCreate([{
      //   userId: req.body.userId
      // }])
      // console.log('adduid : ', adduid)
    // return res.status(200).send(addpid)
    }
    return res.status(200).send(addpid)
    //
    // return res.status(200).send({
    //   message: "Welcome to Assign Project!"
    // });
    //
  } catch (error) {
    // console.log('assign_project error : ', error)
    return res.status(400).send(error);
    // res.status(404).send({
    //   message: "Assign Project not Found!"
    // })
  }
})

router.get('/assignProjects', async (req, res) => {
  try {
    //
    return res.status(200).send({
      message: "Welcome to Assign Projects!"
    });
    //
  } catch (error) {
    res.status(404).send({
      message: "Assign Projects not Found!"
    })
  }
})
// exports.user = users;
module.exports = router;