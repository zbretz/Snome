const db = require('../../database');

/* define model queries for get requests here */

// module.exports = {
  exports.create =  async (snome) => {
    try {
      let result = await db.query('INSERT snome (owner_id, location_id, header, time_to_mountain, mountain_access, availability_start, availability_end, street_address, bedrooms, bathrooms, number_of_beds, perks, snome_description) VALUES (${owner_id},${location_id},${header},${time_to_mountain},${mountain_access},${availability_start},${availability_end},${street_address},${bedrooms},${bathrooms},${number_of_beds},${perks},${snome_description})', snome)
      return result;
    } catch(err) {
      console.log(`DATABASE ERROR: ${err}`)
    }
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