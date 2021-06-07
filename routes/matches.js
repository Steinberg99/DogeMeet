const { ObjectId } = require('mongodb')
const express = require('express');
const router = express.Router();
require('dotenv').config();

let database;

async function getMatchedDoggos() {
  try {
    const UserEnv = process.env.USER_ID;
    const user = await database
      .collection('users')
      .findOne({ _id: ObjectId(UserEnv) });

      console.log(user);

    const matchedDoggos = await database
      .collection('doggos')
      .find({ id: { $in: user.liked_doggos } }, {})
      .toArray();

      console.log(matchedDoggos);

    return matchedDoggos;
  } catch (error) {
    console.log(error);
  }
}


router.get('/matches', async (req, res) => {
  database = req.app.get('database');
  try {
    const matchedDoggos = await getMatchedDoggos();
    res.render('matches', { 
      matchedDoggos
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
