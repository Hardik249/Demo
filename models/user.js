'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const crypto = require('crypto');
var randtoken = require('rand-token');

// const token = crypto.randomBytes(48).toString('hex');
// const Sequelize = new {
//   Model()
// }
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    user_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
    type: DataTypes.TEXT,
    allowNull: false
    // validate: {
    //   isAlpha: true
    // }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contact: {
    type: DataTypes.INTEGER,
    allowNull: false,
     validate: {
      isInt: true
     }
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },

  position: {
    type: DataTypes.STRING,
    allowNull: false
  },
  DoB: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      customValidator(value) {
        if (new Date(value) < new Date(2005, 0, 31, 10, 33, 30, 0)) {
          return value
        }
      }
    }
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    // allowNull: true
    defaultValue: false
  },
  token: {
    type: DataTypes.STRING
    // crypto.randomBytes(48).toString('hex');
     // Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
     // var token = randtoken.generate(16);
  },
  verifiedit: {
    type: DataTypes.DATE
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: false
  },
  updatedBy: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deletedAt: {
    type: DataTypes.DATE
  },
  verified: {
    type: DataTypes.VIRTUAL,
    get() {
      const rawValue = this.getDataValue('token');
    },
    set(value) {
      this.setDataValue('varifiedit', 0);
    }
  },
  setStatus: {
    type: DataTypes.VIRTUAL,
    get() {
      const rawValue = this.getDataValue('token');
    },
    set(value) {
      this.setDataValue('status', 1);
    }
  },
    // name: DataTypes.STRING,
    // email: DataTypes.STRING,
    // contact: DataTypes.INTEGER,
    // role: DataTypes.STRING,
    // position: DataTypes.STRING,
    // DoB: DataTypes.DATE,
    // address: DataTypes.TEXT,
    // createdBy: DataTypes.STRING,
    // updatedBy: DataTypes.STRING
  }, {
    sequelize,
    // Sequelize,
    modelName: 'user',
    paranoid: true,
    // deletedAt: 'destroyTime',
  }); 
  user.removeAttribute('id');
  // content: {}

  // let token = '';
  //   const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
  //     'abcdefghijklmnopqrstuvwxyz0123456789';
  //   for (var i = 0; i < 15; i++) {
  //     token += possibleCharacters.charAt(
  //       Math.floor(Math.random() * possibleCharacters.length)
  //     );
  //   }
  //   return user.init.token.create({ token, user_id })

  // classMethods: {
  //     associate: function(models) {
  //      User.hasOne(models.VerificationToken, {
  //           as: 'verificationtoken',
  //           foreignKey: 'userId',
  //           foreignKeyConstraint: true,
  //         });
  //     }
  //   }
  return user;
};

// console.log(user.init)
// module.exports = user;