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
    defaultValue: "http://www.brooklyn.cuny.edu/web/abo_misc/200304_Campus_Aerial_738x330.jpg"

  },

  address: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Campus;