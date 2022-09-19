const auth = require('./middleware/auth');
const jwt_decode = require('jwt-decode');
// const getUser = verifyToken(function(err, decoded){      
//   if (err) {
//     return res.json({ success: false, message: 'Failed to authenticate token.' });    
//   } else {
//     req.decoded = decoded;
//     console.log('decode is : ', decoded);
//     next();
//   }
// });

const getUser;
module.exports = getUser;