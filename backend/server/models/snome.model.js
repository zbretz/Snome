const db = require('../../database');

/* define model queries for get requests here */

// module.exports = {
  exports.create =  async snome => {
    try {
      let result = await db.query(`SELECT * FROM Snome`)
      return result;
    } catch(err) {
      console.log(`DATABASE ERROR: ${err}`)
    }
  }

  exports.findAll = async () => {
    try {
      let result = await db.query(`SELECT * FROM Snome`)
      // return result;
      return 'test'
    } catch(err) {
      console.log(`DATABASE ERROR: ${err}`)
    }
  }

// };