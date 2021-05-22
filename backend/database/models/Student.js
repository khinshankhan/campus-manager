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
    allowNull: false
  },

  imageUrl : {
    type: Sequelize.STRING,
    defaultValue: "https://www.seekpng.com/png/detail/202-2024994_profile-icon-profile-logo-no-background.png"
  },

  gpa: {
    type: Sequelize.DECIMAL(10,1)
  }

});

module.exports = Student;