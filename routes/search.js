const express = require('express');
const router = express.Router();

router.get('/search', async (req, res) => {
  try {
    //Get the database conncection
    let database = req.app.get('database');

    let locations = await database.collection('locations').find().toArray();
    console.log(locations);

    // Render the search page
    res.render('search', {
      locations: locations
    });
  } catch (error) {
    console.log(error);
  }
});

// Export the router
module.exports = router;
