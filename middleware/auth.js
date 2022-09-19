const jwt = require('jsonwebtoken');
jwtKey = 'jwt'
const jwt_decode = require('jwt-decode');
let decoded;
let createdBy;

const verifyToken = async(req, res, next) => {
	const token = req.header('Authorization');
	if (token) {
		try {
			jwt.verify(token, jwtKey)
			// const decoded = jwt.decode(jwtToken)
			decoded = jwt_decode(token)
			console.log('decode jwt token is : ', decoded)
			createdBy = decoded.user.createdBy
			console.log('createdBy data : ', createdBy)
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
		// return res.status(401).send(err);
	}
	next(createdBy);
}

module.exports = verifyToken;
