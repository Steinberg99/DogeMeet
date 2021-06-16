const express = require('express');
const router = express.Router();
const app = express();

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
        vibe: req.body.vibe,
        location: req.body.location
    };
    const result = await database.collection('doggos').insertOne(dogProfile);
    console.log(dogProfile);

} catch (error) {
    console.error(error);

  } finally {
    res.render('createDogProfile');
  }
});

// Export the router
module.exports = router;