const express = require('express');
const router = express.Router();

router.get('/user-profile/:userId', async (req, res) => {
  try {
    //Get the database conncection
    let database = req.app.get('database');
    let users = await database.collection('users').find().toString();

    // Render the profile page
    res.render('user-profile', {
      users: users
    });
  } catch (error) {
    console.log(error);
  }
});

// Update profile


// Export the router
module.exports = router;