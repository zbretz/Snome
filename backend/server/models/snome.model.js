const db = require('../../database');

/* define model queries for get requests here */

// module.exports = {
  exports.create =  async snome => {

  }

  exports.findAll = async () => {
    try {
      let result = await db.query(`SELECT * FROM Snome`)
      return result;
    } catch(err) {
      console.log(`DATABASE ERROR: ${err}`)
    }
  }

  exports.findOne = async (id) => {
    try {
      let result = await db.query(`SELECT * FROM Snome WHERE id = ${id}`)
      return result;
    } catch(err) {
      console.log(`DATABASE ERROR: ${err}`)
    }
  }

// };