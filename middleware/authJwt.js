const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const db = require("../models/user");
const User = db.user;
verifyToken = (req, res, next) => {
//   let token = req.header('Authorization');
//   if (!token) {
//     return res.status(403).send({
//       message: "No token provided!"
//     });
//   }
//   jwt.verify(token, 'jwt', (err, decoded) => {
//     if (err) {
//       return res.status(401).send({
//         message: "Unauthorized!"
//       });
//     }
//     req.user_id = decoded.id;
//     next();
//   });
// };
// isAdmin = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//     user.getrole().then(role => {
//       for (let i = 0; i < role.length; i++) {
//         if (role[i].name === "admin") {
//           next();
//           return;
//         }
//       }
//       res.status(403).send({
//         message: "Require Admin Role!"
//       });
//       return;
//     });
//   });
// };
// isModerator = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//     user.getrole().then(role => {
//       for (let i = 0; i < role.length; i++) {
//         if (role[i].name === "moderator") {
//           next();
//           return;
//         }
//       }
//       res.status(403).send({
//         message: "Require Moderator Role!"
//       });
//     });
//   });
// };
// isModeratorOrAdmin = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//     user.getrole().then(role => {
//       for (let i = 0; i < role.length; i++) {
//         if (role[i].name === "moderator") {
//           next();
//           return;
//         }
//         if (role[i].name === "admin") {
//           next();
//           return;
//         }
//       }
//       res.status(403).send({
//         message: "Require Moderator or Admin Role!"
//       });
//     });
//   });
console.log('test')
};
const authJwt = {
  verifyToken: verifyToken
};
module.exports = authJwt;