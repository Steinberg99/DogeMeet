const express = require('express');
const router = express.Router();

router.get('/addDogPhoto', async (req, res) => {
    try {
      res.render('addDogPhoto');
    } catch (error) {
      console.log(error);
    }
  });

// Export the router
module.exports = router;