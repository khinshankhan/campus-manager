const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define("student", {

  firstname: {
    type: Sequelize.STRING,
    allowNull: false
  },

  lastname: {
    type: Sequelize.STRING,
    allowNull: false
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },

  imageUrl : {
    type: Sequelize.STRING,
    defaultValue: "https://www.seekpng.com/png/detail/202-2024994_profile-icon-profile-logo-no-background.png",
    validate: {
      isUrl: true
    }
  },

  gpa: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      isFloat: true,
      min: 0,
      max: 4
    }
  }

});

module.exports = Student;
