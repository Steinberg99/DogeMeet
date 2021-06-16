const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();
require('dotenv').config();

let database;

router.get('/matches', async (req, res) => {
  database = req.app.get('database');
  try {
    const matchedDoggos = await getMatchedDoggos();
    res.render('matches', {
      matchedDoggos: matchedDoggos
    });
  } catch (error) {
    console.log(error);
  }
});

async function getMatchedDoggos() {
  try {
    const user = await database
      .collection('users')
      .findOne({ _id: ObjectId(process.env.USER_ID) });

    const matchedDoggos = await database
      .collection('doggos')
      .find({ _id: { $in: user.matched_doggos } }, {})
      .toArray();

    return matchedDoggos;
  } catch (error) {
    console.log(error);
  }
}

// Export the router
module.exports = router;
