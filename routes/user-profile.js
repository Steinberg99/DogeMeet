const express = require('express');
const router = express.Router();

router.get('/user-profile', async (req, res) => {
  try {
    //Get the database conncection
    let database = req.app.get('database');

    let locations = await database.collection('locations').find().toArray();

    // Render the profile page
    res.render('user-profile', {
      locations: locations
    });
  } catch (error) {
    console.log(error);
  }
});

// Export the router
module.exports = router;
