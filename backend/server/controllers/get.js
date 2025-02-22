const { get, helpers } = require("../models");

/* define get request handlers here */

module.exports = {
  getAll: async (req, res) => {
    try {
      const model = helpers.getModelFromUrl(req);
      let data = await get.getAll(model, req.query);
      res.status(200).send(data);
    } catch (err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(400).send(err);
    }
  },
  getOne: async (req, res) => {
    try {
      const id = req.params.id;
      const model = helpers.getModelFromUrl(req);
      const data = await get.getOne(id, model);
      res.status(200).send(data);
    } catch (err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(404).send(err);
    }
  },

  // getUser moved to './user.js'
  //getAllUsers moved to './user.js'
  // for navbar - to alert user when their property has been liked //
  getUnreadLikes: async (req, res) => {
    const user_id = req.params.user_id;
    console.log(user_id)
    get.getUnreadLikes(user_id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send(
          "Some error occurred while fetching unread Likes."
        )
      })
  },

  getSnomeReviews: async (req, res) => {
    try {
      const snome_id = req.params.id;
      let data = await get.getSnomeReviews(snome_id);
      res.status(200).send(data);
    } catch (err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(400).send(err);
    }
  },
  getSnomeByLocationId: async (req, res) => {
    try {
      const location_id = req.params.id;
      let data = await get.getSnomeByLocationId(location_id);
      res.status(200).send(data);
    } catch (err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(400).send(err);
    }
  },
  getWhoLikesMe: async (req, res) => {
    try {
      const snome_id = req.params.snome_id;
      let data = await get.getWhoLikesMe(snome_id);
      res.status(200).send(data);
    } catch (err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(400).send(err);
    }
  },
  getFeaturedLocation: async (req, res) => {
    try {
      let data = await get.getFeaturedLocation();
      res.status(200).send(data);
    } catch (err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(400).send(err);
    }
  },

  getSnomePhotos: async (req, res) => {
    try {
      const snome_id = req.params.id;
      let data = await get.getSnomePhotos(snome_id);
      res.status(200).send(data);
    } catch (err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(400).send(err);
    }
  },

  getListing: async (req, res) => {
    try {
      const location_id = req.params.id;
      let data = await get.getListing(location_id);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  getMessages: async (req, res) => {
    try {
      const user_id = req.params.user_id;
      let data = await get.getMessages(user_id);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  getSnomeDescription: async (req, res) => {
    try {
      let snome_id = req.params.id;
      console.log(snome_id);
      let data = await get.getSnomeDescription(snome_id);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  getMatches: async (req, res) => {
    try {
      const user_id = req.params.id
      let data = await get.getMatches(user_id);
      res.status(200).send(data);
    } catch (err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(400).send(err);
    }
  },
  

  checkLikes: async (req, res) => {
    try {
      let snome_id = req.params.snome_id
      let snome_user_id = req.params.snome_user_id
      let data = await get.checkLikes(snome_id, snome_user_id);
      res.status(200).send(data);
    } catch (err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(400).send(err);
    }
  },
  // <TEMPLATE>: async (req, res) => {
  //   try {
  //     let data = await get.<TEMPLATE>(req.body);
  //     res.status(200).json(data);
  //   } catch(err) {
  //     console.log(err);
  //     res.status(400).send(err);
  //   }
  // },
};
