const db = require('../../database');

/* define model queries for get requests here */

module.exports = {
  create: async (snome) => {
    try {
      let result = await db.query(`SELECT * FROM Snome`)
      return result;
    } catch(err) {
      console.log(`DATABASE ERROR: ${err}`)
    }
  }


};