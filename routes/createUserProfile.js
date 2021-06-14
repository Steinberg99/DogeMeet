const express = require('express');
const router = express.Router();

router.get('/createUserProfile', async (req, res) => {
    try {
      res.render('createUserProfile');
    } catch (error) {
      console.log(error);
    }
  });

router.post("/createUserProfile", async (req, res) => {
    try {
    // Get the database conncection
    database = req.app.get('database');
    let userProfile = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    const result = await database.collection('users').insertOne(userProfile);
    console.log(userProfile);
    let userprofileID = userProfile._id;
    console.log(userprofileID)
} catch (error) {
    console.error(error);

  } finally {
    res.render('createUserProfile');
  }
});

// Export the router
module.exports = router;