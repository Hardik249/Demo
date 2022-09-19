let user;
let decoded;
let createdBy;
const jwt = require('jsonwebtoken');
jwtKey = 'jwt';

const verifyToken = async(req, res, next) => {
console.log('token-1');
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
      console.log(error)
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
  next();
}
console.log('verifyToken File Call Check!');  

module.exports = verifyToken;