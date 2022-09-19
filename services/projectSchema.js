const joi = require('joi');
const project = require('../models/project')

console.log('projectSchema call services here!')
const projectSchema = async(req, res, next) => {
    const projectSchema = joi.object().keys({
    projectname: joi.string()
    // projectplanningHours: joi.number(),
    // projectactualHours: joi.number(),
    // projectstartDate: joi.date(),
    // projectEndDate: joi.date(),
    // projectdeadline: joi.date(),
    // projectstatus: joi.string(),
    // projectcreatedBy: joi.string(),
    // projectupdatedBy: joi.string()
  });
  const {projectError, projectValues} = joi.validate(req.body);

  console.log('projectSchema services call : ', projectSchema)
}


module.exports = projectSchema;

// class validation{
//   constructor(db) {
//     this.db = db;
//   }

//   validateProject() {
//     console.log('validation service call!')
//     return joi.object({
//       name: joi.string(),
//       planningHours: joi.number(),
//       actualHours: joi.number(),
//       startDate: joi.date(),
//       EndDate: joi.date(),
//       deadline: joi.date(),
//       status: joi.string(),
//       createdBy: joi.string(),
//       updatedBy: joi.string()
//     });

//     return joi.validate(req.body);
//   }
// }






// var schema;

// const validation = async(req, res, next) => {
//   console.log('validation hello!')
//   // schema = await joi.object({
//   //   name: joi.string(),
//   //   planningHours: joi.number(),
//   //   actualHours: joi.number(),
//   //   startDate: joi.date(),
//   //   EndDate: joi.date(),
//   //   deadline: joi.date(),
//   //   status: joi.string(),
//   //   createdBy: joi.string(),
//   //   updatedBy: joi.string()
//   // });
//   // const { error, value } = await joi.validate(req.body)
//   // console.log('validation schema : ', schema)
//   next();
// }

// module.exports = {validation} ;