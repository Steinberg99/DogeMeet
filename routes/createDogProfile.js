const express = require('express');
const router = express.Router();

router.get('/createDogProfile', async (req, res) => {
    try {
      res.render('createDogProfile');
    } catch (error) {
      console.log(error);
    }
  });

  router.post("/createDogProfile", async (req, res) => {
    try {
    // Get the database conncection
    database = req.app.get('database');
    let dogProfile = {
        doggoId: '10',
        name: req.body.name,
        age: req.body.age,
        breed: req.body.breed,
        description: req.body.description,
        vibe: req.body.doggo_vibes,
        location: req.body.location
    };
    await database.collection('doggos').insertOne(dogProfile);
    console.log(dogProfile);
    //console.log (req.body);

  } catch (error) {
    console.error(error);

  } finally {
    res.render('addDogPhoto');
  }
});

// Export the router
module.exports = router;