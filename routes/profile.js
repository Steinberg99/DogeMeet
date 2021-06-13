const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();

router.get('/profile/:doggoProfileId', async (req, res) => {
  try {
    // Get the database connection
    let database = req.app.get('database');

    // Get the doggo profile and location
    let doggoProfileId = req.params.doggoProfileId;
    let doggoProfile = await database
      .collection('doggos')
      .findOne({ _id: ObjectId(doggoProfileId) });
    let location = await database
      .collection('locations')
      .findOne({ id: doggoProfile.location_id });

    // Render the profile page
    res.render('profile', {
      doggo: doggoProfile,
      location: location
    });
  } catch (error) {
    console.log(error);
  }
});

// Export the router
module.exports = router;
