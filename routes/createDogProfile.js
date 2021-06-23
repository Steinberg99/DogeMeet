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
        vibe: req.body.vibe,
        location: req.body.location
    };
    await database.collection('doggos').insertOne(dogProfile);
    console.log(dogProfile);

    let dogeVibesList = document.querySelector('#doge_vibe_list');
    let dogeVibes = dogeVibesList.getElementsByTagName('li');
    
    var vibeArray = [];
    var checkboxes = document.querySelector('#doge_vibe_list')
    
    for (var i = 0; i < checkboxes.length; i++) {
      vibeArray.push(checkboxes[i].value)
    }
    console.log (vibeArray);
    
    
} catch (error) {
    console.error(error);

  } finally {
    res.render('addDogPhoto');
  }
});

// Export the router
module.exports = router;