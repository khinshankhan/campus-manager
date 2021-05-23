const Sequelize = require('sequelize');
const db = require('../db');

const Campus = db.define("campus", {

  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  description: {
    type: Sequelize.STRING,
  },

  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://gogocharters.com/blog/wp-content/uploads/2017/11/columbia-university-campus.jpg",
    validate: {
      isUrl: true
    }
  },

  address: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Campus;
