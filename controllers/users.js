const express = require('express');
const router = express.Router();
const db = require("../models/assignproject");
const Test = db.test;
const userRoute = require('../routes/users');
const projectRoute = require('../routes/projects');
// router.use('/users', (req, res) => {
//   return res.json({ message: "Hello!" })
//   console.log("Hello!")
// });
// console.log('Hello World!')
router.use('/users', userRoute);
router.use('/projects', projectRoute);
console.log('user-controller');
module.exports = router;


// // Create and Save a new Test
// exports.create = (req, res) => {
  
// };

// // Retrieve all test from the database.
// exports.list = (req, res) => {
  
// };

// // Update a Test by the id in the request
// exports.update = (req, res) => {
  
// };

// // Find a getUpdate single Test with an id
// exports.getUpdate = (req, res) => {
  
// };

// // Delete a Test with the specified id in the request
// exports.delete = (req, res) => {
  
// };



// exports.create = (req, res) => {
  
//   // Validate request
//   if (!req.body.id) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//     return;
//   }
// };  




// exports.list = (req, res) => {
//   const id = req.query.id;
//   // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
//   Users.list({  })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving data."
//       });
//     });
// };



// exports.getUpdate = (req, res) => {
//   const id = req.params.id;
//   Users.getUpdateByPk(id)
//     .then(data => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find data with id=${id}.`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving data with id=" + id
//       });
//     });
// };




// exports.update = (req, res) => {
//   const id = req.params.id;
//   Users.update(req.body, {
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "data was updated successfully."
//         });
//       } else {
//         res.send({
//           message: `Cannot update data with id=${id}. Maybe data was not found or req.body is empty!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating data with id=" + id
//       });
//     });
// };



// exports.delete = (req, res) => {
//   const id = req.params.id;
//   Users.destroy({
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "data was deleted successfully!"
//         });
//       } else {
//         res.send({
//           message: `Cannot delete data with id=${id}. Maybe data was not found!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete data with id=" + id
//       });
//     });
// };

// exports.router = router;
// module.exports = router;